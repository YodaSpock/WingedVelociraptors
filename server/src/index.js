const WebSocket = require("ws");

const WebSocketEventManager = require("./websocket-event-manager");
const GameModule = require("./game/module");
const App = require("./app");

const wss = new WebSocket.Server({ port: 81 });
const wsem = new WebSocketEventManager(wss);

const gameModule = new GameModule();

const app = new App(wsem, gameModule);
app.run();
