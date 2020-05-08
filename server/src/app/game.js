const events = require("../networking/wsEvents");
const { roles } = require("../game/constants");

/**
 * `onVotingBegin` will be called when regular game has ended
 */
class GameApp {
  constructor(wsem, gameModule) {
    /** @type {import("../networking/websocket-event-manager")} */
    this.wsem = wsem;
    /** @type {import("../game/module")} */
    this.gameModule = gameModule;

    this.actTimer = null;

    this.actHandler = this.actHandler.bind(this);
    this.narrAckHandler = this.narrAckHandler.bind(this);
  }

  run() {
    this.nextAct();

    this.wsem.addEventHandler(events.c_act, this.actHandler);
    this.wsem.addEventHandler(events.c_narrAck, this.narrAckHandler);
  }

  cleanUp() {
    this.wsem.removeEventHandler(events.c_act, this.actHandler);
    this.wsem.removeEventHandler(events.c_narrAck, this.narrAckHandler);
  }

  nextAct() {
    const { playerTargets, roleData, dialogue } = this.gameModule.readyNextRole();
    this.playerTargets = playerTargets;

    this.gameModule.narrators.forEach((id) => this.wsem.sendMessage(id, events.s_narrate, { dialogue }));
  
    playerTargets.forEach((player, i) => this.wsem.sendMessage(player.id, events.s_act, { state: "start", data: roleData[i] }));
  }

  actHandler(id, data) {
    let responseData;
    try {
      responseData = this.gameModule.idAct(id, data.data);
    } catch(error) {
      this.wsem.sendMessage(id, events.s_error, { message: error.message });
    }
    if(responseData) this.wsem.sendMessage(id, events.s_act, { state: "mid", data: responseData });
  }

  narrAckHandler() {
    if(this.actTimer) return;

    this.actTimer = setTimeout(() => {
      this.actTimer = null;

      if(this.gameModule.currentRole === roles.rachel) {
        this.gameModule.players.filter((player) => player.originalRole === roles.rachel)
          .forEach((player) => {
            if(!player.actionDisabled) this.wsem.sendMessage(player.id, events.s_act, { data: { noise: true } })
          });
      }

      this.playerTargets.forEach((player) => this.wsem.sendMessage(player.id, events.s_act, { state: "end" }));

      if(this.gameModule.hasNextRole) {
        try {
          this.nextAct();
        } catch(error) { this.onVotingBegin(); }
      } else {
        console.log("Starting voting phase...");
        this.cleanUp();
        this.onVotingBegin();
      }
    }, 7000); // TODO: maybe make timer conditional length for Annalise (more time)
  }
}

module.exports = GameApp;
