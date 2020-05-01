const events = require("../wsEvents");

class GameApp {
  constructor(wsem, gameModule) {
    this.wsem = wsem;
    this.gameModule = gameModule;
  }

  run() {
    this.nextAct();

    this.wsem.addEventHandler(events.c_act, (id, data) => {
      // give data to gameModule. gameModule must track current role to know who data applies to
    });
  
    this.wsem.addEventHandler(events.c_narr_ack, () => {
      // start timer (7 seconds). after it ends, continue to next act
      // track if timer is already running
    });
  }

  nextAct() {
    const { playerTargets, roleData, dialogue } = this.gameModule.getNextActData();

    this.gameModule.narrators.forEach((id) => this.wsem.sendMessage(id, events.s_narrate, { dialogue }));
  
    playerTargets.forEach((player) => this.wsem.sendMessage(player.id, events.s_act, roleData));
  }

  beginVoting() {
    // TODO: allow players to lock in vote to avoid long timer
  }
}

module.exports = GameApp;
