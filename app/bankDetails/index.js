const db = require('../../db');
const BankDetailsRepository = require('./repository-bank-details');
const BankDetailsController = require('./controller-bank-details');
const BankDetailsRouter = require('./routes-bank-details');

const repository = new BankDetailsRepository(db);
const controller = new BankDetailsController(repository);
const router = new BankDetailsRouter(controller);

module.exports = {
  router
}