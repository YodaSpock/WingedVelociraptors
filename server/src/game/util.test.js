const { getRolePool } = require("./util");
const { roles } = require("./constants");

describe("util", () => {
  describe("getRolePool", () => {
    test("wvCount", () => {
      const wvCount = 10;
      const config = { wvCount, roles: [] };
      const pool = getRolePool(config);
      expect(pool.order).toEqual([roles.wv]);
      expect(pool.roles).toEqual(new Array(wvCount).fill(roles.wv));
    });

    test("roles", () => {
      const configRoles = ["daniel", "jake", "annalise", "rachel", "josh"];
      const pool = getRolePool({ roles: configRoles, wvCount: 0});
      expect(pool.roles.sort()).toEqual(configRoles.sort());
      expect(pool.order).toEqual(["rachel", "jake", "annalise", "daniel", "josh"]);
    });

    test("roles and wvCount", () => {
      const wvCount = 3;
      const configRoles = ["cat", "jake", "annalise", "sydney", "josh"];
      const pool = getRolePool({ roles: configRoles, wvCount });
      
      const expectedRoles = Array.from(configRoles);
      for(let i = 0; i < wvCount; i++) expectedRoles.push(roles.wv);
      expect(pool.roles.sort()).toEqual(expectedRoles.sort());
      expect(pool.order).toEqual(["wv", "sydney", "jake", "annalise", "cat", "josh"])
    });

    test("defaults", () => {
      const pool = getRolePool();

      const expectedRoles = Array.from(Object.values(roles));
      for(let i = 0; i < 2; i++) expectedRoles.push(roles.wv);
      expect(pool.roles.sort()).toEqual(expectedRoles.sort());
      expect(pool.order).toEqual(Array.from(Object.values(roles)));
    });
  });
});
