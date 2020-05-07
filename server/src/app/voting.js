const events = require("../networking/wsEvents");

class VotingApp {
  constructor(wsem, gameModule) {
    /** @type {import("../networking/websocket-event-manager")} */
    this.wsem = wsem;
    /** @type {import("../game/module")} */
    this.gameModule = gameModule;

    this.votesRemaining = this.gameModule.players.length;
    /**
     * Maps player ID to the ID they are voting for
     * @type {Object}
     */
    this.votes = {};
    this.gameModule.players.forEach((player) => this.votes[player.id] = -1);

    this.voteHandler = this.voteHandler.bind(this);

    // TODO: allow players to lock in vote to avoid long timer
  }

  run() {
    this.wsem.addEventHandler(events.c_vote, this.voteHandler);
    // TODO: tell players which middle cards are exposed (new WS event)
  }

  voteHandler(id, data) {
    this.votes[id] = data.id;
    if(--this.votesRemaining === 0) this.endGame();
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
    let max = -1, maxIds;
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
