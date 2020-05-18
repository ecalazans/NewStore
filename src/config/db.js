const { Pool } = require("pg");

module.exports = new Pool({
    user: 'ecalazans',
    password: 'erisabela1',
    host: 'localhost',
    port: '5432',
    database: 'launchstoredb'
});