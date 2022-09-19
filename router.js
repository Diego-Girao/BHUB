const routes = [
  require('./app/clients').router,
  require('./app/bankDetails').router
];

function configure(app) {
  for (let route of routes) {
    route.configure(app);
  }
}

module.exports = {
  configure
}