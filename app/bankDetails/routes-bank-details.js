class BankDetailsRouter {
  constructor(controller) {
    this.controller = controller;
    this.configure = this.configure.bind(this);
  }

  configure(app) {
    app.get('/bank_details', this.controller.findAll);
    app.post('/bank_details', this.controller.insert);
    app.get('/bank_details/:id', this.controller.findById);
    app.delete('/bank_details/:id', this.controller.remove);
    app.put('/bank_details/:id', this.controller.update);
  }
}

module.exports = BankDetailsRouter;
