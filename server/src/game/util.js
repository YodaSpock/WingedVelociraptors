const { roles, dialogues } = require("./constants");

const getDialogue = (role) => {
  if(role === roles.lucas || role === roles.josh) {
    // passive; nothing should be read
    return null;
  } else {
    return dialogues[role];
  }
};

const getRoleData = (role) => {
  switch(role) {
    case roles.wv:
    case roles.jake:
    case roles.austin:
    case roles.lucas:
    case roles.josh:
      // passive or effectively passive
      return null;
    // TODO: cases with actual data
  }
};

const getRolePool = (config) => {
  // TODO: currently, config only tracks number of WVs
  // TODO: in future, it will also hold other enabled roles
  // TODO: this will be configured and sent over by the client
  // TODO: will need to sort

  const pool = Object.values(roles);
  const order = Array.from(pool);
  // already have one WV in pool
  for(let i = 0; i < config.wvCount - 1; i++) pool.push(roles.wv);
  return { roles: pool, order };
};

const shift = (players, direction) => {
  if(direction !== "right" && direction !== "left") throw new Error("Invalid `direction` parameter");

  // TODO: handle Josh
  let next = direction === "right" ? players[players.length - 1].role : players[0].role;
  for(let i = direction === "right" ? 0 : players.length - 1;
      direction === "right" ? i < players.length : i >= 0;
      direction === "right" ? i++ : i--) {
    const player = players[i];
    const tmpNext = player.role;
    player.role = next;
    next = tmpNext;
  }
}

/**
 * Shift the `role` property of each player to the right once.
 * @param {Array<Player>} players Array of players
 */
const rshift = (players) => {
  // TODO: instead, go backwards and find first non-josh
  let next = players[players.length - 1].role;
  for(let i = 0; i < players.length; i++) {
    // TODO: just continue; if josh?
    const player = players[i];
    const tmpNext = player.role;
    player.role = next;
    next = tmpNext;
  }
};

/**
 * Shift the `role` property of each player to the left once.
 * @param {Array<Player>} players Array of players
 */
const lshift = (players) => {
  // TODO: instead, go forwards and find first non-josh
  let next = players[0].role;
  for(let i = players.length - 1; i >= 0; i--) {
    // TODO: just continue; if josh?
    const player = players[i];
    const tmpNext = player.role;
    player.role = next;
    next = tmpNext;
  }
};

/**
 * Swap the `role` properties of the two players/cards.
 * @param {Player} player1 
 * @param {Player} player2 
 */
const swap = (player1, player2) => {
  if(player1.role === roles.josh || player2.role === roles.josh) return;

  const tmp = player1.role;
  player1.role = player2.role;
  player2.role = tmp;
};

module.exports = { getDialogue, getRoleData, getRolePool, rshift, lshift, swap };
