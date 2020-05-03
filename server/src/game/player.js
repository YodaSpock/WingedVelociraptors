class Player {
  constructor(name, id, role, position) {
    this.name = name;
    this.id = id;
    this.role = role;
    this.originalRole = role;
    this.position = position;
    this.hasActed = false;
  }
}

module.exports = Player;