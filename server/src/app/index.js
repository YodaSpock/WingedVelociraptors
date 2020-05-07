const PregameApp = require("./pregame");
const GameApp = require("./game");
const VotingApp = require("./voting");

class App {
  constructor(wsem, gameModule) {
    wsem.run();
    this.wsem = wsem;
    this.gameModule = gameModule;
  }

  run() {
    const pregameApp = new PregameApp(this.wsem, this.gameModule);
    pregameApp.onReady = () => {
      const gameApp = new GameApp(this.wsem, this.gameModule);
      gameApp.onVotingBegin = () => {
        const votingApp = new VotingApp(this.wsem, this.gameModule);
        votingApp.run();
      };
      gameApp.run();
    };
    pregameApp.run();
  }
}

module.exports = App;
