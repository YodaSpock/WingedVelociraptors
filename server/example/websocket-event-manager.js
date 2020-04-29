const logEl = document.getElementById("log");
const log = (msg) => logEl.value += `${msg}\n`;

class WebSocketEventManager {
  constructor(url, onOpen) {
    this.events = {};
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      log(`WebSocket opened at ${url}`);
      if(onOpen) onOpen();
    };

    this.ws.onmessage = (message) => {
      message = JSON.parse(message.data);
      if(!message.event) {
        log(`Invalid message received: ${message}`);
        return;
      }
      log(`Event ${message.event} received: ${JSON.stringify(message.data)}`);
      if(this.events[message.event]) this.events[message.event](message.data);
    };
  }

  addEventHandler(event, callback) {
    this.events[event] = callback;
  }

  sendMessage(event, data) {
    const msg = JSON.stringify({ event, data });
    log(`Sending: ${msg}`);
    this.ws.send(msg);
  }
}

export default WebSocketEventManager;
