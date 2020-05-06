const GameModule = require("./module");
const { roles } = require("./constants");
const Player = require("./player");

describe("GameModule", () => {
  /** @type {GameModule} */
  let module;

  beforeEach(() => {
    module = new GameModule();
  });

  describe("narrators", () => {
    test("empty narrator list on construction", () => {
      expect(module.narrators.length).toBe(0);
    });
  
    test("narrators can be added", () => {
      const ids = [0, 1, 2];
      ids.forEach((id) => module.addNarrator(id));
      ids.forEach((id) => expect(module.narrators).toContain(id));
      expect(module.narrators.length).toBe(ids.length);
    });
  
    test("narrators can be removed", () => {
      const ids = [0, 1, 2];
      ids.forEach((id) => module.addNarrator(id));
      module.removeNarrator(0);
      module.removeNarrator(2);
      expect(module.narrators).toContain(1);
      expect(module.narrators.length).toBe(1);
    });
  });

  describe("playerAct", () => {
    const roleToId = {
      [roles.sydney]: 0,
      [roles.jake]: 1,
      [roles.austin]: 2,
      [roles.annalise]: 3,
      [roles.hannah]: 4,
      [roles.daniel]: 5,
      [roles.cat]: 6
    }

    /**
     * Basic equality check (does NOT check every property of `Player`)
     * @param {Player} p1 
     * @param {Player} p2 
     * @returns {boolean}
     */
    const playersEqual = (p1, p2) => {
      const props = ["name", "id", "role", "position"];
      return props.every((prop) => p1[prop] === p2[prop]);
    };

    const act = (role, data) => {
      module.currentRole = role;
      module.playerAct(roleToId[role], data);
    }

    beforeEach(() => {
      let modulePlayers = [], originalPlayers = [];
      for(let [role, id] of Object.entries(roleToId)) {
        modulePlayers.push(new Player(id, id, role, id));
        originalPlayers.push(new Player(id, id, role, id));
      }
      module.players = modulePlayers;
    });

    test("sydney", () => {
      act(roles.sydney, { id: roleToId[roles.jake] });

      expect(module.getPlayer(roleToId[roles.jake]).asleep).toBe(true);
    });

    test("jake", () => {
      act(roles.jake);

      for(let [role, id] of Object.entries(roleToId)) {
        expect(module.getPlayer((id + 1) % module.players.length).role).toBe(role);
      }
    });

    test("austin", () => {
      act(roles.austin);

      for(let [role, id] of Object.entries(roleToId)) {
        let mod = (id - 1) % module.players.length;
        mod = mod < 0 ? mod + module.players.length : mod;
        expect(module.getPlayer(mod).role).toBe(role);
      }
    });

    describe("annalise", () => {
      const swapRole = roles.hannah;
      const swapId = roleToId[swapRole];

      const sendFirstMessage = () => act(roles.annalise, { id: swapId });

      test("first message", () => {
        sendFirstMessage();

        expect(module.getPlayer(roleToId[roles.annalise]).roleData.id).toBe(swapId);
      });

      test("second message - swap", () => {
        sendFirstMessage();
        act(roles.annalise, { swap: true });

        expect(module.getPlayer(roleToId[roles.annalise]).role).toBe(swapRole);
        expect(module.getPlayer(swapId).role).toBe(roles.annalise);
      });

      test("second message - don't swap", () => {
        sendFirstMessage();
        act(roles.annalise, { swap: false });

        expect(module.getPlayer(roleToId[roles.annalise]).role).toBe(roles.annalise);
        expect(module.getPlayer(swapId).role).toBe(swapRole);
      });

      test("not sending first message throws error", () => {
        expect(() => act(roles.annalise, { swap: true })).toThrow();
      });
    });

    test.todo("hannah"); 
    test.todo("daniel");
    test.todo("cat");

    describe("josh", () => {

    });
  });
});

