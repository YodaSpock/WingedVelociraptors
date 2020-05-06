class Player {
  /**
   * @param {String} name 
   * @param {Number} id 
   * @param {String} role 
   * @param {Number} position 
   */
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
