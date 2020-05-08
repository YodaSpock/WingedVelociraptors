const roles = {
  wv: "wv",
  sydney: "sydney",
  rachel: "rachel",
  jake: "jake",
  austin: "austin",
  annalise: "annalise",
  hannah: "hannah",
  daniel: "daniel",
  isaac: "isaac",
  cat: "cat",
  lucas: "lucas",
  josh: "josh"
};

const roleToOrder = {};
Object.values(roles).forEach((value, i) => roleToOrder[value] = i);

const dialogues = {
  intro: "intro",
  wv: "wv",
  sydney: "sydney",
  rachel: "rachel",
  jake: "jake",
  austin: "austin",
  annalise: "annalise",
  hannah: "hannah",
  daniel: "daniel",
  isaac: "isaac",
  cat: "cat"
};

module.exports = { roles, roleToOrder, dialogues };
