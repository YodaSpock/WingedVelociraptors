const { roles } = require("./constants");
const { shuffle } = require("../util");
const Player = require("./player");
const { getDialogue, getRoleData, wvTest } = require("./util");

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
    // assume all roles are being used for now
    // this will be configurable in the future
    const sessionRoles = Array.from(Object.keys(roles));
    const numCards = this.players.length + 3;
    if(numCards > sessionRoles.length) throw new Error(`Too many players. Max ${sessionRoles.length - 3}.`);
    // remove excess cards
    sessionRoles.splice(numCards);
    // treated as a queue to decide next role
    this.sessionOrder = Array.from(sessionRoles);
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

  hasNextAct() {
    return this.sessionOrder.length > 0;
  }

  getNextActData() {
    const nextRole = this.sessionOrder.shift();

    let playerTargets;
    if(wvTest(nextRole)) {
      playerTargets = this.players.filter((player) => wvTest(player.originalRole));
    } else {
      playerTargets = this.players.filter((player) => nextRole === player.originalRole);
    }

    const dialogue = getDialogue(nextRole);
    const roleData = getRoleData(nextRole);

    // skip rest of WV roles if applicable
    if(wvTest(nextRole)) {
      while(wvTest(this.sessionOrder[0])) this.sessionOrder.shift();
    }

    return { playerTargets, roleData, dialogue };
  }
}

module.exports = GameModule;
