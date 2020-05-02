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

module.exports = { getDialogue, getRoleData, getRolePool };
