const events = require("./wsEvents");
const ReconnectMap = require("./reconnectMap");

class WebSocketEventManager {
  /**
   * If `handleReconnects` is `true`, WSEM will automatically indentify reconnected
   *  connections through `s_init` and `c_reconnect` messages. `setSessionID` must
   *  be called before reconnecting can be handled.
   * When handling reconnects, consumers of WSEM can use the original ID that identified
   *  the client.
   * @param {import("ws/index").Server} wss 
   * @param {Function} onClose 
   * @param {boolean} handleReconnects 
   */
  constructor(wss, onClose, handleReconnects = false) {
    this.wss = wss;
    this.onClose = onClose;
    this.handleReconnects = handleReconnects;

    this.events = {};
    this.clients = {};
    this.clientCount = 0;
    /** Maps original WS IDs to their new IDs. Used to handle reconnects. */
    this.reconnectMap = new ReconnectMap();
    /** Maps original WS IDs to queues of messages they should receive on reconnect. */
    this.messageQueue = {};
  }

  run() {
    this.wss.on("connection", (ws) => {
      const id = this.clientCount++;
      this.clients[id] = ws;

      ws.on("message", (message) => {
        this.handleEvent(id, message);
      });

      ws.on("close", () => {
        if(this.onClose) this.onClose(id);
      });
    });

    if(this.handleReconnects) {
      this.addEventHandler(events.c_reconnect, (id, data) => {
        if(this.sessionID && data.sessionID === this.sessionID) {
          this.reconnectMap.addMapping(data.clientID, id);
          this.flushMessageQueue(data.clientID);
        }
      });
    }
  }

  /**
   * Set an ID unique to this session/game/etc. A UUIDv4 is sufficient.
   * @param {Number} id 
   */
  setSessionID(id) {
    this.sessionID = id;
  }

  /**
   * When called, the WSEM will begin tracking the given ID through reconnects.
   * `handleReconnects` must have been `true` in the constructor and `setSessionID`
   *  must have been called before this.
   * @param {Number} id 
   */
  trackClientReconnect(id) {
    if(this.handleReconnects && this.sessionID) this.sendMessage(id, events.s_init, { clientID: id, sessionID: this.sessionID });
  }

  addToMessageQueue(id, msg) {
    if(!(id in this.messageQueue)) this.messageQueue[id] = [];
    this.messageQueue[id].push(msg);
  }

  /**
   * Send all the messages stored in the queue to the given original ID.
   * Messages are sent FIFO.
   * @param {Number} id 
   */
  flushMessageQueue(id) {
    if(!(id in this.messageQueue)) return;

    let msg;
    while((msg = this.messageQueue[id].shift())) this.sendMessage(id, msg.event, msg.data, false);
  }

  addEventHandler(eventName, callback) {
    if(!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(callback);
  }

  removeEventHandler(eventName, callback) {
    if(this.events[eventName]) this.events[eventName] = this.events[eventName].filter((fn) => fn !== callback);
  }

  handleEvent(id, message) {
    console.log(`Received: ${message}`);
    message = JSON.parse(message);
    if(this.handleReconnects && this.reconnectMap.hasOGFor(id)) id = this.reconnectMap.getOG(id);

    const handlers = this.events[message.event];
    if(handlers) handlers.forEach((handler) => handler(id, message.data));
  }

  sendMessage(id, event, data, queue = true) {
    const originalID = id;
    if(this.handleReconnects && this.reconnectMap.hasCurrentFor(id)) id = this.reconnectMap.getCurrent(id);
    const ws = this.clients[id];

    const msg = JSON.stringify({
      event,
      data
    });

    if(this.handleReconnects && (ws.readyState === 2 || ws.readyState === 3) && queue) {
      this.addToMessageQueue(originalID, { event, data });
    } else {
      console.log(`Sending: ${msg}`);
      ws.send(msg);
    }
  }
}

module.exports = WebSocketEventManager;
