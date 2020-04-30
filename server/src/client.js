class Client {
  constructor(id, name, order) {
    this.id = id;
    this.name = name;
    this.order = order;
    this.ready = false;
  }
}

module.exports = Client;
