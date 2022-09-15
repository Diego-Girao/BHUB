const mariadb = require('mariadb');

const db = mariadb.createPool({
    host: 'localhost',
    port: 3305,
    user: 'root',
    password: 'root',
    database: 'bhub',
    connectionLimit: 5
});

module.exports = db;