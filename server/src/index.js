const WebSocket = require("ws");

const WebSocketEventManager = require("./websocket-event-manager");
const events = require("./wsEvents");
const GameModule = require("./game/module");
const Client = require("./client");

const wss = new WebSocket.Server({ port: 81 });
const wsem = new WebSocketEventManager(wss, (id) => {
  delete clients[id];
  gameModule.removeNarrator(id);

  console.log(clients);
});

const state = {
  started: false
};
const clients = {};
let order = 0;
const gameModule = new GameModule();

const runGame = () => {
  while(gameModule.hasNextAct()) {
    gameModule.performNextAct();
    // TODO: `performNextAct` needs to return dialogue and roleData so it can be sent to client
    // TODO: listener for data from client. need way to give data to gameModule. gameModule must track current role to know who data applies to
    // TODO: listener for narrator acknowledge. start timer (7 seconds). after it ends, continue to next act

    // TODO: allow players to lock in vote to avoid long timer
  }
};

wsem.addEventHandler(events.c_join, (id, data) => {
  if(!state.started) { 
    clients[id] = new Client(id, data.name, order++);
    console.log(clients);
    // TODO: inform client current number of players when joining. update them when others join
  }
});

wsem.addEventHandler(events.c_narrator, (id) => {
  if(!state.started) gameModule.addNarrator(id);
});

wsem.addEventHandler(events.c_start, () => {
  if(state.started) return;

  state.started = true;
  const gameClients = Object.values(clients).sort((a, b) => a.order - b.order);
  gameModule.setup(gameClients);

  gameModule.players.forEach((player) => {
    const otherPlayers = gameModule.players.filter((el) => el.id !== player.id).map((el) => ({ name: el.name, id: el.id }));
    wsem.sendMessage(player.id, events.s_role, { role: player.role, position: player.position, players: otherPlayers });
  });

  state.notReadyCount = gameModule.players.length;
});

wsem.addEventHandler(events.c_ready, (id) => {
  if(!clients[id].ready) {
    clients[id].ready = true;

    if(--state.notReadyCount === 0) {
      console.log("All ready! Starting game...");
      runGame();
    }
  }
});
