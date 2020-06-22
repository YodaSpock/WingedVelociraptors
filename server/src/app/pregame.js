const { v4: uuidv4 } = require("uuid");

const events = require("../networking/wsEvents");
const Client = require("../client");

/**
 * Handles all pregame networking.
 * Runs `this.onReady` when all clients are ready to start.
 */
class PregameApp {
  /**
   * 
   * @param {import("../networking/websocket-event-manager")} wsem 
   * @param {import("../game/module")} gameModule 
   */
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
    this.setRolesHandler = this.setRolesHandler.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.readyHandler = this.readyHandler.bind(this);
  }

  run() {
    // TODO: client is implied to be coming back when connection closes
    //       therefore, client will have to explicitely say it's leaving if they want to stop playing before c_start (new event)

    /*
    This code should be run when the user explicitely says they're leaving (new event):

    delete this.clients[id];
    this.gameModule.removeNarrator(id);
    console.log(this.clients);
    */

    this.wsem.addEventHandler(events.c_join, this.joinHandler);
    this.wsem.addEventHandler(events.c_narrator, this.narratorHandler);
    this.wsem.addEventHandler(events.c_setRoles, this.setRolesHandler);
    this.wsem.addEventHandler(events.c_start, this.startHandler);
    this.wsem.addEventHandler(events.c_ready, this.readyHandler);
  }

  cleanUp() {
    this.wsem.removeEventHandler(events.c_join, this.joinHandler);
    this.wsem.removeEventHandler(events.c_narrator, this.narratorHandler);
    this.wsem.removeEventHandler(events.c_setRoles, this.setRolesHandler);
    this.wsem.removeEventHandler(events.c_start, this.startHandler);
    this.wsem.removeEventHandler(events.c_ready, this.readyHandler);
  }

  joinHandler(id, data) {
    if(!this.state.started) { 
      this.clients[id] = new Client(id, data.name, this.order++);
      console.log(this.clients);

      // TODO: inform client current number of players when joining. update them when others join

      if(!this.state.sessionID) {
        this.state.sessionID = uuidv4();
        this.wsem.setSessionID(this.state.sessionID);
      }
      this.wsem.trackClientReconnect(id);
    }
  }

  narratorHandler(id) {
    if(!this.state.started) this.gameModule.addNarrator(id);
  }

  setRolesHandler(id, data) {
    this.gameModule.setRoleConfig(data);
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
