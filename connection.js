const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Breakers2025",
    database: "PLATTDB"
})

module.exports = client
