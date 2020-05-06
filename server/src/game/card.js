/**
 * Class to represent a middle card
 */
class Card {
  /**
   * @param {String} role 
   */
  constructor(role) {
    this.role = role;
    this.exposed = false;
  }
}

module.exports = Card;
