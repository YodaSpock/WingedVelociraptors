class Player {
  constructor(name, id, role, position) {
    this.name = name;
    this.id = id;
    this.role = role;
    this.originalRole = role;
    this.position = position;
    this.hasActed = false;
    this.asleep = false;

    // additional data specific to a role
    this.roleData = {};
  }
}

module.exports = Player;
