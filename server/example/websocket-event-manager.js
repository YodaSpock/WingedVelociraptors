/**
 * Client-side WebSocket event manager.
 * The `onLog` property of an instance can be set as a function receiving a log string.
 */
class WebSocketEventManager {
  constructor(url, onOpen) {
    this.events = {};
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      if(this.onLog) this.onLog(`WebSocket opened at ${url}`);
      if(onOpen) onOpen();
    };

    this.ws.onmessage = (message) => {
      message = JSON.parse(message.data);
      if(!message.event) {
        if(this.onLog) this.onLog(`Invalid message received: ${message}`);
        return;
      }
      if(this.onLog) this.onLog(`Event ${message.event} received: ${JSON.stringify(message.data)}`);
      if(this.events[message.event]) this.events[message.event](message.data);
    };
  }

  addEventHandler(event, callback) {
    this.events[event] = callback;
  }

  sendMessage(event, data) {
    const msg = JSON.stringify({ event, data });
    if(this.onLog) this.onLog(`Sending: ${msg}`);
    this.ws.send(msg);
  }
}

export default WebSocketEventManager;
