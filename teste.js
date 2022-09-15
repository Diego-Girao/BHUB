const db = require('./db');
const ClientsRepository = require('./app/clients/repository-clients');

const repository = new ClientsRepository(db);

async function teste() {
    let clients = await repository.findAll();
    console.log(clients);
    process.exit(0);
}

teste();