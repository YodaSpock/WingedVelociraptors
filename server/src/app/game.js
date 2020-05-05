const events = require("../wsEvents");

class GameApp {
  constructor(wsem, gameModule) {
    this.wsem = wsem;
    this.gameModule = gameModule;

    this.actTimer = null;
  }

  run() {
    this.nextAct();

    this.wsem.addEventHandler(events.c_act, (id, data) => {
      this.gameModule.playerAct(id, data);
    });
  
    this.wsem.addEventHandler(events.c_narr_ack, () => {
      if(this.actTimer) return;

      this.actTimer = setTimeout(() => {
        this.actTimer = null;

        // TODO: probably send `s_act` message to rachel to make noise if she is current role

        if(this.gameModule.hasNextRole) {
          this.nextAct();
        } else {
          console.log("Starting voting phase...");
          // TODO: switch to voting phase
        }
      }, 7000); // TODO: maybe make timer conditional length for Annalise (more time)
    });
  }

  nextAct() {
    const { playerTargets, roleData, dialogue } = this.gameModule.readyNextRole();

    this.gameModule.narrators.forEach((id) => this.wsem.sendMessage(id, events.s_narrate, { dialogue }));
  
    playerTargets.forEach((player) => this.wsem.sendMessage(player.id, events.s_act, roleData));
  }

  beginVoting() {
    // TODO: allow players to lock in vote to avoid long timer
  }

  cleanUp() {
    // TODO: make event listeners their own functions
    // TODO: clear all event listeners this class has used
  }
}

module.exports = GameApp;
