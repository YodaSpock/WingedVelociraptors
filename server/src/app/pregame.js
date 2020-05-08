const events = require("../networking/wsEvents");
const Client = require("../client");

/**
 * Handles all pregame networking.
 * Runs `this.onReady` when all clients are ready to start.
 */
class PregameApp {
  constructor(wsem, gameModule) {
    this.wsem = wsem;
    this.gameModule = gameModule;

    this.state = {
      started: false
    };
    this.clients = {};
    this.order = 0;

    this.joinHandler = this.joinHandler.bind(this);
    this.narratorHandler = this.narratorHandler.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.readyHandler = this.readyHandler.bind(this);
  }

  run() {
    this.wsem.onClose = (id) => {
      delete this.clients[id];
      this.gameModule.removeNarrator(id);
    
      console.log(this.clients);
    };

    this.wsem.addEventHandler(events.c_join, this.joinHandler);
    this.wsem.addEventHandler(events.c_narrator, this.narratorHandler);
    this.wsem.addEventHandler(events.c_start, this.startHandler);
    this.wsem.addEventHandler(events.c_ready, this.readyHandler);
  }

  cleanUp() {
    this.wsem.onClose = null;
    this.wsem.removeEventHandler(events.c_join, this.joinHandler);
    this.wsem.removeEventHandler(events.c_narrator, this.narratorHandler);
    this.wsem.removeEventHandler(events.c_start, this.startHandler);
    this.wsem.removeEventHandler(events.c_ready, this.readyHandler);
  }

  joinHandler(id, data) {
    if(!this.state.started) { 
      this.clients[id] = new Client(id, data.name, this.order++);
      console.log(this.clients);
      // TODO: inform client current number of players when joining. update them when others join
    }
  }

  narratorHandler(id) {
    if(!this.state.started) this.gameModule.addNarrator(id);
  }

  startHandler() {
    if(this.state.started) return;
  
    this.state.started = true;
    const gameClients = Object.values(this.clients).sort((a, b) => a.order - b.order);
    this.gameModule.setup(gameClients);
  
    this.gameModule.players.forEach((player) => {
      const otherPlayers = this.gameModule.players.filter((el) => el.id !== player.id).map((el) => ({ name: el.name, id: el.id }));
      this.wsem.sendMessage(player.id, events.s_role, { id: player.id, role: player.role, position: player.position, players: otherPlayers });
    });
  
    this.state.notReadyCount = this.gameModule.players.length;
  }

  readyHandler(id) {
    if(!this.clients[id].ready) {
      this.clients[id].ready = true;
  
      if(--this.state.notReadyCount === 0) {
        console.log("All ready! Starting game...");

        this.cleanUp();
        this.onReady();
      }
    }
  }
}

module.exports = PregameApp;
