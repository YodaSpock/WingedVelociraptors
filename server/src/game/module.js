const { shuffle } = require("../util");
const Player = require("./player");
const Card = require("./card");
const { getRolePool, getDialogue, getRoleData, lshift, rshift, swap, isEffectivelyPassive } = require("./util");
const { roles } = require("./constants");

class GameModule {
  constructor() {
    /** @type {Array<Number>} */
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
    const { roles: sessionRoles, order: sessionOrder } = getRolePool({ wvCount: 3 });
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
    // guarantee order is maintained
    Object.freeze(this.players);
  }

  assignMiddle(sessionRoles) {
    /** @type {Array<Card>} */
    this.middle = sessionRoles.slice(-3).map((role) => new Card(role));
    Object.freeze(this.middle);
  }

  /** @returns {boolean} */
  get hasNextRole() { return this.sessionOrder.length > 0; }


  /**
   * @typedef {Object} NextRoleData
   * @property {Array<Player>} playerTargets
   * @property {Array<Object>} roleData
   * @property {String} dialogue
   */

  /**
   * @returns {NextRoleData}
   */
  readyNextRole() {
    if(this.sessionOrder.length === 0) throw new Error("No more roles");

    let nextRole = true;
    // error handling in case `this.sessionOrder` contains other roles
    while(nextRole && !this.gameHasRole(nextRole = this.sessionOrder.shift()));
    if(!nextRole) throw new Error("No more roles");
    console.log(`Readying next role: ${nextRole}`);

    let playerTargets = this.players.filter((player) => nextRole === player.originalRole);

    const dialogue = getDialogue(nextRole);
    const roleData = getRoleData(nextRole, playerTargets);

    /** @type {String} */
    this.currentRole = nextRole;

    if(isEffectivelyPassive(this.currentRole)) {
      playerTargets.forEach((player) => this.playerAct(player));
    }

    return { playerTargets, roleData, dialogue };
  }

  /** @returns {boolean} */
  gameHasRole(role) {
    return this.players.filter((player) => player.originalRole === role).length > 0;
  }

  /**
   * @param {Number} id 
   * @returns {Player}
   */
  getPlayer(id) {
    const player = this.players.filter((el) => el.id === id)[0];
    if(!player) throw new Error(`No player found with ID ${id}`);
    return player;
  }

  playerAct(player, data) {
    if(player.originalRole !== this.currentRole || player.hasActed || player.asleep) return;

    console.log(`Player ${player.name} acting`);
    let responseData;
    let fullyActed = true;

    if(player.originalRole === roles.sydney) {
      if(!("id" in data)) throw new Error("Sydney must supply an `id` property");

      const target = this.getPlayer(data.id);
      target.asleep = true;
    } else if(player.originalRole === roles.jake) {
      rshift(this.players);
    } else if(player.originalRole === roles.austin) {
      lshift(this.players);
    } else if(player.originalRole === roles.annalise) {
      if("id" in data) {
        player.roleData.id = data.id;
        responseData = { role: this.getPlayer(data.id).role };
        fullyActed = false;
      } else if("swap" in data) {
        if(!("id" in player.roleData)) throw new Error("Annalise didn't choose an ID already");

        if(data.swap) {
          const target = this.getPlayer(player.roleData.id);
          swap(player, target);
        }
      } else {
        throw new Error("Annalise must supply either an `id` or `swap` property");
      }
    } else if(player.originalRole === roles.hannah) {
      if(!data.ids) throw new Error("Hannah must supply an `ids` property");
      else if(data.ids.length !== 2) throw new Error("Hannah must supply two IDs in `ids`");

      const targets = data.ids.map((id) => this.getPlayer(id));
      swap(targets[0], targets[1]);
    } else if(player.originalRole === roles.daniel) {
      if(!("card" in data)) throw new Error("Daniel must supply a `card` property");
      else if(data.card < 0 || data.card >= this.middle.length) throw new Error(`\`card\` must be between 0 (inclusive) and ${this.middle.length} (exclusive)`);

      const card = this.middle[data.card];
      swap(player, card);
    } else if(player.originalRole === roles.cat) {
      if(!("card" in data)) throw new Error("Cat must supply a `card` property");
      else if(data.card < 0 || data.card >= this.middle.length) throw new Error(`\`card\` must be between 0 (inclusive) and ${this.middle.length} (exclusive)`);

      this.middle[data.card].exposed = true;
    }

    player.hasActed = fullyActed;
    if(responseData) return responseData;
  }

  /**
   * Manipulates the game given data from the given ID.
   * Returns a data object to respond to the client with, if applicable.
   * @param {Number} id 
   * @param {Object} data 
   * @returns {Object}
   */
  idAct(id, data) {
    const player = this.getPlayer(id);
    return this.playerAct(player, data);
  }
}

module.exports = GameModule;
