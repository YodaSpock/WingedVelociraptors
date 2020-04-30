const { roles, dialogues } = require("./constants");

const getDialogue = (role) => {
  if(wvTest(role)) {
    return dialogues.wv;
  } else if(role === roles.lucas || role === roles.josh) {
    // passive; nothing should be read
    return null;
  } else {
    return dialogues[role];
  }
};

const getRoleData = (role) => {
  switch(role) {
    case roles.wv1:
    case roles.wv2:
    case roles.wv3:
    case roles.jake:
    case roles.austin:
    case roles.lucas:
    case roles.josh:
      // passive or effectively passive
      return null;
    // TODO: cases with actual data
  }
};

const wvTest = (role) => {
  return role === roles.wv1 || role === roles.wv2 || role === roles.wv3;
}

module.exports = { getDialogue, getRoleData, wvTest };
