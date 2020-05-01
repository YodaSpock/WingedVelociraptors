const PregameApp = require("./pregame");
const GameApp = require("./game");

class App {
  constructor(wsem, gameModule) {
    this.wsem = wsem;
    this.gameModule = gameModule;
  }

  run() {
    const pregameApp = new PregameApp(this.wsem, this.gameModule);
    pregameApp.onReady = () => {
      const gameApp = new GameApp(this.wsem, this.gameModule);
      gameApp.run();
    };
    pregameApp.run();
  }
}

module.exports = App;
