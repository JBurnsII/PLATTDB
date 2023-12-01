const Client = require('pg').Client;

const client = new Client({
    host: "tigradvisr.cmhpzn7cmtwl.us-east-1.rds.amazonaws.com",
    user: "Advisr",
    port: 5432,
    password: "Gotigers",
    database: "PLATTDB"
});

module.exports = client;
