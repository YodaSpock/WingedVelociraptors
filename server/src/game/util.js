const { roles, dialogues } = require("./constants");

const getDialogue = (role) => {
  if(role === roles.lucas || role === roles.josh) {
    // passive; nothing should be read
    return null;
  } else {
    return dialogues[role];
  }
};

/**
 * Returns a parallel array corresponding to the data to be sent to each target.
 * @param {String} role 
 * @param {Array<Players>} targets 
 */
const getRoleData = (role, targets) => {
  if(role === roles.isaac) {
    return targets.map((target) => ({ role: target.role }));
  } else {
    return new Array(targets.length).fill(null);
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

/**
 * Returns whether or not the given role should act but doesn't require player interaction
 * @param {String} role 
 */
const isEffectivelyPassive = (role) => {
  switch(role) {
    case roles.jake:
    case roles.austin:
      return true;
    default:
      return false
  }
};

/**
 * @param {Player} player 
 * @return {boolean} If the player is a Josh whose passive should apply
 */
const validJosh = (player) => player.role === roles.josh && !player.actionDisabled;

/**
 * Shift the `role` property of each player to the right once.
 * @param {Array<import("./player")>} players Array of players
 */
const rshift = (players) => {
  // going backwards, find first non-josh
  let next, i = players.length - 1;
  while(i > 0 && (next = players[i--].role) === roles.josh);
  if(i === 0) return;

  for(let i = 0; i < players.length; i++) {
    const player = players[i];
    if(validJosh(player)) continue;
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
  // going forwards, find first non-josh
  let next, i = 0;
  while(i < players.length && (next = players[i++].role) === roles.josh);
  if(i === players.length) return;

  for(let i = players.length - 1; i >= 0; i--) {
    const player = players[i];
    if(validJosh(player)) continue;
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
  if(validJosh(player1) || validJosh(player2)) return;

  const tmp = player1.role;
  player1.role = player2.role;
  player2.role = tmp;
};

module.exports = { getDialogue, getRoleData, getRolePool, rshift, lshift, swap, isEffectivelyPassive };
