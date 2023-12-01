const client = require('./connection')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

client.connect();
console.log(client);

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/judges', (req, res)=>{
    client.query(`Select * from judges`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
})

app.get('/judges/:judges_ID', (req, res)=>{
    client.query(`Select * from judges where judges_ID=${req.params.judges_ID}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
})

app.post('/judges', (req, res)=> {
    const judge = req.body;
    let insertQuery = `insert into judges(judges_ID, name, address) 
                       values(${judge.judges_ID}, '${judge.name}', '${judge.address}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
})

app.put('/judges/:judges_ID', (req, res)=> {
    let judge = req.body;
    let updateQuery = `update judges
                       set name = '${judge.name}',
                       address = '${judge.address}'
                       where judges_ID = ${judge.judges_ID}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
})

app.delete('/judges/:judges_ID', (req, res)=> {
    let insertQuery = `delete from judges where judges_ID=${req.params.judges_ID}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
})

client.end();
