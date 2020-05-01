const { shuffle } = require("../util");
const Player = require("./player");
const { getRolePool, getDialogue, getRoleData } = require("./util");

class GameModule {
  constructor() {
    this.narrators = [];
  }

  addNarrator(id) {
    this.narrators.push(id);
  }

  removeNarrator(id) {
    this.narrators = this.narrators.filter((val) => val !== id);
  }

  /**
   * Set up the game by dealing cards.
   * @param {Object} clients Maps WebSocket IDs to `Client` instances
   */
  setup(clients) {
    this.players = new Array(clients.length);

    this.dealCards(clients);
  }

  /** Assigns roles and decides the three middle cards */
  dealCards(clients) {
    const { sessionRoles, sessionOrder } = getRolePool({ wvCount: 3 });
    this.sessionOrder = sessionOrder;

    const numCards = this.players.length + 3;
    if(numCards > sessionRoles.length) throw new Error(`Too many players. Max ${sessionRoles.length - 3}.`);
    // remove excess cards (if game is configured correctly, shouldn't happen)
    sessionRoles.splice(numCards);
    shuffle(sessionRoles);

    this.assignRoles(clients, sessionRoles);
    this.assignMiddle(sessionRoles);
  }

  assignRoles(clients, sessionRoles) {
    clients.forEach((client, i) => this.players[i] = new Player(client.name, client.id, sessionRoles[i], i));
  }

  assignMiddle(sessionRoles) {
    this.middle = sessionRoles.slice(-3);
  }

  get hasNextRole() { return this.sessionOrder.length > 0; }

  readyNextRole() {
    if(this.sessionOrder.length === 0) throw new Error("No more roles");

    let nextRole;
    // error handling in case `this.sessionOrder` contains other roles
    while(!this.gameHasRole(nextRole = this.sessionOrder.shift()));
    console.log(`Readying next role: ${nextRole}`);

    let playerTargets = this.players.filter((player) => nextRole === player.originalRole);

    const dialogue = getDialogue(nextRole);
    const roleData = getRoleData(nextRole);

    this.currentRole = nextRole;
    this.roleActed = false;

    return { playerTargets, roleData, dialogue };
  }

  gameHasRole(role) {
    return this.players.filter((player) => player.originalRole === role).length > 0;
  }

  playerAct(id, data) {
    const player = this.players.filter((el) => el.id === id)[0];
    if(!player || player.originalRole !== this.currentRole || player.hasActed) return;

    console.log(`Player ${player.name} acting`);

    // TODO: use `data` to manipulate roles, players, etc.

    player.hasActed = true;
  }
}

module.exports = GameModule;
