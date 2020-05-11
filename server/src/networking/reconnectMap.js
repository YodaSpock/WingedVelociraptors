class ReconnectMap {
  constructor() {
    this.ogToCurrent = {};
    this.currentToOG = {};
  }

  addMapping(og, current) {
    this.ogToCurrent[og] = current;
    this.currentToOG[current] = og;
  }

  getOG(current) {
    return this.currentToOG[current];
  }

  getCurrent(og) {
    return this.ogToCurrent[og];
  }

  hasCurrentFor(og) {
    return og in this.ogToCurrent;
  }

  hasOGFor(current) {
    return current in this.currentToOG;
  }
}

module.exports = ReconnectMap;
