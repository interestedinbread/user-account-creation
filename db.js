const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'user_accounts',
    password: 'OutRight_13',
    port: 5432
});

client.connect()
    .then(() => console.log('connected to the user accounts database'))
    .catch((err) => console.error('connection error', err.stack))

module.exports = client;