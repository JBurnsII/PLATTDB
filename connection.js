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

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.listen(port, () => {console.log(`App running on port ${port}.`)})

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

//advanced functionality

async function selectCountParty(data, name, type, partya, partyb) {
    try {
      const res = await client.query(
        `SELECT (SELECT ${data}::decimal FROM judges js inner join cases cs on js.judges_id = cs.judge_id and js.name like '%${name}%' and cs.type like '%${type}%' and cs.decision = ${partya}) / ((SELECT ${data}::decimal FROM judges js inner join cases cs on js.judges_id = cs.judge_id and js.name like '%${name}%' and cs.type like '%${type}%' and cs.decision = ${partya}) + (SELECT ${data}::decimal FROM judges js inner join cases cs on js.judges_id = cs.judge_id and js.name like '%${name}%' and cs.type like '%${type}%' and cs.decision = ${partyb})) as percent_chance` 
      );
      return res.rows;//[0][0];
    } catch (err) {
      return err.stack;
    }
} 

async function selectJudge(judge) {
    try {
      const res = await client.query(
        `SELECT js.name FROM judges js where js.name like '${judge}' ` 
      );
      return res.rows;
    } catch (err) {
      return err.stack;
    }
}  
async function advanced_Function (judge, case_type) {
    var result1 = await selectCountParty('Count(*)',judge, case_type, 'cs.party1_id', 'cs.party2_id');
    var result2 = await selectCountParty('Count(*)',judge, case_type, 'cs.party2_id', 'cs.party1_id');
    var judge_search = await selectJudge(judge);
    console.log('Given the judge search: %s', judge);
    console.log('Judges found in search:');
    console.log(judge_search);
    console.log('Given the case type search: %s', case_type)
    console.log('Chance that Partitioner wins: %s', result1);
    console.log(result1);
    console.log('Chance that Respondent wins:')
    console.log(result2);
}

advanced_Function('Andrea Stroh Thompson', `Petition for Review under`); //change these imputs in order to search up different percent chances for outcomes.
