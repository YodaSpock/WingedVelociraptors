class WebSocketEventManager {
  constructor(wss, onClose) {
    this.wss = wss;
    this.events = {};
    this.clients = {};

    wss.on("connection", (ws) => {
      const id = Object.keys(this.clients).length;
      this.clients[id] = ws;

      ws.on("message", (message) => {
        this.handleEvent(id, message);
      });

      ws.on("close", (code, reason) => {
        onClose(id);
      });
    });
  }

  addEventHandler(eventName, callback) {
    if(!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(callback);
  }

  handleEvent(id, message) {
    console.log(`Received: ${message}`);
    message = JSON.parse(message);

    const handlers = this.events[message.event];
    if(handlers) handlers.forEach((handler) => handler(id, message.data));
  }

  sendMessage(id, event, data) {
    const ws = this.clients[id];

    const msg = JSON.stringify({
      event,
      data
    });
    console.log(`Sending: ${msg}`);
    ws.send(msg);
  }

  broadcastMessage(event, data, wsIgnore) {
    console.log(`Sending: ${JSON.stringify({ event, data })}`);
    this.wss.clients.forEach((ws) => {
      if(ws === wsIgnore) return;
      ws.send(JSON.stringify({
        event,
        data
      }));
    });
  }
};

module.exports = WebSocketEventManager;
