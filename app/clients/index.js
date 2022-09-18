const db = require('../../db');
const ClientRepository = require('./repository-clients');
const ClientController = require('./controller-clients');
const ClientRouter = require('./routes-clients');

const repository = new ClientRepository(db);
const controller = new ClientController(repository);
const router = new ClientRouter(controller);

module.exports = {
  router
}