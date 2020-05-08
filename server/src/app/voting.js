const events = require("../networking/wsEvents");

class VotingApp {
  /**
   * @param {import("../networking/websocket-event-manager")} wsem 
   * @param {import("../game/module")} gameModule 
   * @param {Number} voteTime Time players have to vote, in seconds
   */
  constructor(wsem, gameModule, voteTime) {
    this.wsem = wsem;
    this.gameModule = gameModule;
    this.voteTime = voteTime ? voteTime : 300;

    this.votesRemaining = this.gameModule.players.length;
    /**
     * Maps player ID to the ID they are voting for
     * @type {Object}
     */
    this.votes = {};
    this.gameModule.players.forEach((player) => this.votes[player.id] = -1);

    this.voteHandler = this.voteHandler.bind(this);
  }

  run() {
    this.wsem.addEventHandler(events.c_vote, this.voteHandler);

    const middle = this.gameModule.middle.map((card) => ({ exposed: card.exposed, role: card.exposed ? card.role : null }));
    this.gameModule.players.forEach((player) => this.wsem.sendMessage(player.id, events.s_timerStart, { length: this.voteTime, middle }));

    this.voteTimeout = setTimeout(() => {
      this.endGame();
    }, this.voteTime * 1000);
  }

  cleanUp() {
    this.wsem.removeEventHandler(this.voteHandler);
  }

  voteHandler(id, data) {
    this.votes[id] = data.id;
    if(--this.votesRemaining === 0) {
      if(this.voteTimeout) clearTimeout(this.voteTimeout);
      this.endGame();
    }
  }

  tally() {
    const tallies = {};
    Object.values(this.votes).forEach((id) => {
      if(id === -1) return;
      if(!(id in tallies)) tallies[id] = 0;
      tallies[id]++;
    });
    return tallies;
  }

  /**
   * 
   * @param {Object} tallies Maps ID to its number of votes
   * @returns {Array<Number>}
   */
  getKilledIds(tallies) {
    let max = -1, maxIds = [];
    for(let [id, count] of Object.entries(tallies)) {
      if(count > max) {
        max = count;
        maxIds = [id];
      } else if(count === max) {
        maxIds.push(id);
      }
    }
    return maxIds.map((id) => Number(id));
  }

  endGame() {
    const tallies = this.tally();
    const killedIds = this.getKilledIds(tallies);

    const killed = killedIds.map((id) => ({ name: this.gameModule.getPlayer(id).name, id }));
    const players = this.gameModule.players.map((player) => ({ name: player.name, id: player.id, role: player.role }));
    this.gameModule.players.forEach((player) => {
      const data = {
        killed,
        role: player.role,
        players: players.filter((el) => el.id !== player.id)
      };
      this.wsem.sendMessage(player.id, events.s_results, data);
    });
  }
}

module.exports = VotingApp;
