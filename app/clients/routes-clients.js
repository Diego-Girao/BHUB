class ClientRouter {
  constructor(controller) {
    this.controller = controller;
    this.configure = this.configure.bind(this);
  }

  configure(app) {
    app.get('/clients', this.controller.findAll);
    app.post('/clients', this.controller.insert);
    app.get('/clients/:id', this.controller.findById);
    app.delete('/clients/:id', this.controller.remove);
    app.put('/clients/:id', this.controller.update);
  }
}

module.exports = ClientRouter;
