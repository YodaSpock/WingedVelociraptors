const GameModule = require("./module");
const { roles } = require("./constants");
const Player = require("./player");
const Card = require("./card");

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

  describe("idAct", () => {
    /** Initially, each player's `name`, `id`, and `order` will be equal to their mapped id */
    const roleToId = {
      [roles.sydney]: 0,
      [roles.jake]: 1,
      [roles.austin]: 2,
      [roles.annalise]: 3,
      [roles.hannah]: 4,
      [roles.daniel]: 5,
      [roles.cat]: 6
    }

    const act = (role, data) => {
      module.currentRole = role;
      module.idAct(roleToId[role], data);
    }

    beforeEach(() => {
      let modulePlayers = [], originalPlayers = [];
      for(let [role, id] of Object.entries(roleToId)) {
        modulePlayers.push(new Player(String(id), id, role, id));
        originalPlayers.push(new Player(String(id), id, role, id));
      }
      module.players = modulePlayers;
    });

    test("sydney", () => {
      act(roles.sydney, { id: roleToId[roles.jake] });

      expect(module.getPlayer(roleToId[roles.jake]).actionDisabled).toBe(true);

      act(roles.jake);

      for(let [role, id] of Object.entries(roleToId)) {
        expect(module.getPlayer(id).role).toBe(role);
      }
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

    test("hannah", () => {
      const role1 = roles.annalise;
      const role2 = roles.austin;
      act(roles.hannah, { ids: [roleToId[role1], roleToId[role2]] });

      expect(module.getPlayer(roleToId[role1]).role).toBe(role2);
      expect(module.getPlayer(roleToId[role2]).role).toBe(role1);
    });

    test("daniel", () => {
      module.middle = [
        new Card(roles.annalise),
        new Card(roles.lucas),
        new Card(roles.austin)
      ];
      const index = 1;
      const newRole = module.middle[index].role;

      act(roles.daniel, { card: index });

      expect(module.getPlayer(roleToId[roles.daniel]).role).toBe(newRole);
      expect(module.middle[index].role).toBe(roles.daniel);
    });

    test("cat", () => {
      module.middle = [
        new Card(roles.annalise),
        new Card(roles.lucas),
        new Card(roles.austin)
      ];
      const index = 1;

      act(roles.cat, { card: index });

      module.middle.forEach((card, i) => {
        if(i === index) {
          expect(card.exposed).toBe(true);
        } else {
          expect(card.exposed).toBe(false);
        }
      });
    });

    describe("josh", () => {
      const joshId = 7;

      beforeEach(() => {
        module.players.push(new Player(String(joshId), joshId, roles.josh, joshId));
      });

      describe("jake", () => {
        test("josh awake", () => {
          act(roles.jake);

          expect(module.getPlayer(joshId).role).toBe(roles.josh);
        });

        test("josh asleep", () => {
          const expectedNewRole = module.getPlayer(joshId - 1).role;

          act(roles.sydney, { id: joshId });
          act(roles.jake);

          expect(module.getPlayer(joshId).role).toBe(expectedNewRole);
        });
      });

      describe("austin", () => {
        test("josh awake", () => {
          act(roles.austin);

          expect(module.getPlayer(joshId).role).toBe(roles.josh);
        });

        test("josh asleep", () => {
          const expectedNewRole = module.getPlayer((joshId + 1) % module.players.length).role;

          act(roles.sydney, { id: joshId });
          act(roles.austin);

          expect(module.getPlayer(joshId).role).toBe(expectedNewRole);
        });
      });
      
      describe("annalise", () => {
        test("josh awake", () => {
          act(roles.annalise, { id: joshId });
          act(roles.annalise, { swap: true });

          expect(module.getPlayer(joshId).role).toBe(roles.josh);
          expect(module.getPlayer(roleToId[roles.annalise]).role).toBe(roles.annalise);
        });

        test("josh asleep", () => {
          act(roles.sydney, { id: joshId });
          act(roles.annalise, { id: joshId });
          act(roles.annalise, { swap: true });

          expect(module.getPlayer(joshId).role).toBe(roles.annalise);
          expect(module.getPlayer(roleToId[roles.annalise]).role).toBe(roles.josh);
        });
      });

      describe("hannah", () => {
        test("josh awake", () => {
          const otherRole = roles.annalise;

          act(roles.hannah, { ids: [joshId, roleToId[otherRole]] });

          expect(module.getPlayer(joshId).role).toBe(roles.josh);
          expect(module.getPlayer(roleToId[otherRole]).role).toBe(otherRole);
        });

        test("josh asleep", () => {
          const otherRole = roles.annalise;

          act(roles.sydney, { id: joshId });
          act(roles.hannah, { ids: [joshId, roleToId[otherRole]] });

          expect(module.getPlayer(joshId).role).toBe(otherRole);
          expect(module.getPlayer(roleToId[otherRole]).role).toBe(roles.josh);
        });
      });
    });
  });
});
