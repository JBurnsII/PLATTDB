const Client = require('pg').Client;

const client = new Client({
    user: "Advisr",
    host: "tigradvisr.cmhpzn7cmtwl.us-east-1.rds.amazonaws.com",
    port: 5432,
    password: "Gotigers",
    database: "PLATTDB",
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect(function(err) {
    if(err) throw err;
    console.log("connected")
});

console.log("before query")

client.query("SELECT * FROM judges Where judges_id = 500", function (err, result, fields) {
    if (err) throw err;
    console.log(result.rows);
});

// module.exports = client



//having trouble exporting client this is index.js
//const client = require('./connection')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.listen(port, () => {console.log(`App running on port ${port}.`)})

//client.connect();
//console.log(client);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

//judges route
app.get('/judges', (req, res)=>{
    client.query(`Select * from judges`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
})
app.get('/judges/:id', (req, res)=>{
    client.query(`Select * from judges where judges_ID=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
})
app.get('/judges/:id/sits', (req, res)=>{
    const {id} = req.params;
    client.query(`Select * from sits where judges=${id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
})
app.get('/judges/:id/sits/court', (req, res)=>{
    const {id} = req.params;
    client.query(`Select * from court where court_ID=(Select courts from sits where judges=${id})`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
})

//party routes