const WebSocket = require("ws");

const WebSocketEventManager = require("./websocket-event-manager");
const events = require("./wsEvents");
const Player = require("./game/player");
const { shuffle } = require("./util");

const state = {
  started: false
};
const clients = {};
// Roles are decided by placement in the `players` array
const players = [];

const wss = new WebSocket.Server({ port: 81 });
const wsem = new WebSocketEventManager(wss, (id) => {
  delete clients[id];
  console.log(clients);
});

wsem.addEventHandler(events.c_join, (id, data) => {
  if(!state.started) { clients[id] = data.name; console.log(clients); }
});

wsem.addEventHandler(events.c_start, () => {
  if(state.started) return;

  state.started = true;

  Object.keys(clients).forEach((id, i) => {
    players.push(new Player(clients[id], id, i));
  });

  shuffle(players);

  console.log(players);

  // TODO: add some way to choose which characters are in this game
  players.forEach((player, i) => {
    wsem.sendMessage(player.id, events.s_role, { role: i, position: 0});
  });
});
