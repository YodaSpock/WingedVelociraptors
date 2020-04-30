const { roles, dialogues } = require("./constants");
const { shuffle } = require("../util");
const Player = require("./player");
const { getDialogue, getRoleData, wvTest } = require("./util");

class GameModule {
  constructor(wsem) {
    this.wsem = wsem;
    this.narrators = [];
  }

  addNarrator(id) {
    this.narrators.push(id);
  }

  removeNarrator(id) {
    this.narrators = this.narrators.filter((val) => val !== id);
  }

  /**
   * Set up the game by dealing cards and notifying players of their roles.
   * @param {Object} clients Maps WebSocket IDs to `Client` instances
   */
  setup(clients) {
    this.players = new Array(Object.keys(clients).length);

    this.dealCards();

    // TODO: probably move this outside (handle all networking elsewhere)
    // TODO: also provide array of other players
    this.players.forEach((player) => {
      wsem.sendMessage(player.id, events.s_role, { role: player.role, position: player.position });
    });
  }

  /** Assigns roles and decides the three middle cards */
  dealCards() {
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

    this.assignRoles(sessionRoles);
    this.assignMiddle(sessionRoles);
  }

  assignRoles(sessionRoles) {
    const ids = Object.keys(clients);
    ids.forEach((id, i) => this.players.push(new Player(clients[id].name, id, sessionRoles[i], i)));
  }

  assignMiddle(sessionRoles) {
    this.middle = sessionRoles.slice(-3);
  }

  hasNextAct() {
    return this.sessionOrder.length > 0;
  }

  performNextAct() {
    const nextRole = this.sessionOrder.shift();
    this.act(nextRole);
    // TODO: if `nextRole` was a WV, skip following WV roles
  }

  act(role) {
    let targets;
    if(wvTest(role)) {
      targets = this.players.filter((player) => wvTest(player.originalRole));
    } else {
      targets = this.players.filter((player) => role === player.originalRole);
    }

    const dialogue = getDialogue(role);
    const roleData = getRoleData(role);
    // send dialogue to narrators
    // send `roleData` to player if it is not `null`
    // wait for data from player
    // update players accordingly
    // wait for narrator acknowledge, start timer, then go to next act
  }
};

module.exports = GameModule;
