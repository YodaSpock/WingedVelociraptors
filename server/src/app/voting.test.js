const VotingApp = require("./voting");
const WebSocketEventManager = require("../networking/websocket-event-manager");
const Player = require("../game/player");
const events = require("../networking/wsEvents");

describe("VotingApp", () => {
  /** @type {VotingApp} */
  let votingApp;
  /** @type {WebSocketEventManager} */
  let wsem;
  /** @type {Object} */
  let gameModule;
  const playersLength = 10;

  const vote = (fromId, toId) => {
    wsem.handleEvent(fromId, JSON.stringify({ event: events.c_vote, data: { id: toId }}));
  }

  beforeEach(() => {
    wsem = new WebSocketEventManager();
    gameModule = { players: [] };
    for(let i = 0; i < playersLength; i++) gameModule.players.push(new Player(`name_${i}`, i, `role_${i}`, i));
    votingApp = new VotingApp(wsem, gameModule);
    votingApp.run();
  });

  test("c_vote", () => {
    const clientId = 0;
    const votedId = 1;
    vote(clientId, votedId);
    expect(votingApp.votes[clientId]).toBe(votedId);
  });

  test("tally", () => {
    votingApp.endGame = jest.fn();
    for(let i = 0; i < 6; i++) {
      vote(i, 6);
    }
    for(let i = 6; i < playersLength; i++) {
      vote(i, 1);
    }

    const tallies = votingApp.tally();
    for(let i = 0; i < playersLength; i++) {
      if(i === 1) {
        expect(tallies[i]).toBe(playersLength - 6);
      } else if(i === 6) {
        expect(tallies[i]).toBe(6);
      } else {
        expect(!(i in tallies) || tallies[i] === 0).toBe(true);
      }
    }
  });

  test("getKilledIds", () => {
    const tallies = {
      0: 1,
      1: 2,
      3: 1,
      10: 100,
      50: 4,
      60: 99,
      101: 100
    };
    const killedIds = votingApp.getKilledIds(tallies);
    console.log(killedIds)
    expect(killedIds).toHaveLength(2);
    expect(killedIds).toContain(10);
    expect(killedIds).toContain(101);
  });

  test("casting all votes calls endGame", () => {
    votingApp.endGame = jest.fn();
    for(let i = 0; i < playersLength; i++) {
      vote(i, 0);
    }
    expect(votingApp.endGame.mock.calls.length).toBe(1);
  });

  test("endGame", () => {
    gameModule.getPlayer = (id) => gameModule.players[id];
    const killedIds = [1, 2, 3];
    const killedObjects = killedIds.map((id) => ({ name: `name_${id}`, id }));
    votingApp.tally = jest.fn();
    votingApp.getKilledIds = jest.fn(() => killedIds);
    wsem.sendMessage = jest.fn();

    votingApp.endGame();

    expect(votingApp.tally.mock.calls).toHaveLength(1);
    expect(votingApp.getKilledIds.mock.calls).toHaveLength(1);
    wsem.sendMessage.mock.calls.forEach((call) => {
      const [id, event, data] = call;
      expect(event).toBe(events.s_results);
      expect(data.role).toBe(`role_${id}`);
      expect(data.killed).toEqual(killedObjects);
      expect(data.players).toEqual(gameModule.players
        .filter((player) => player.id !== id)
        .map(player => ({ name: player.name, id: player.id, role: player.role })))
    });
  });
});