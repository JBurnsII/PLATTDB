//npm install pg --save

const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3000");
})

client.connect();

//npm install express --save
//npm install body-parser --save

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/judges', (req, res)=>{
    client.query(`Select * from judges`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
client.connect();

app.get('/judges/:judges_ID', (req, res)=>{
    client.query(`Select * from judges where judges_ID=${req.params.judges_ID}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
client.connect();

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
    client.end;
})

app.put('/judges/:judges_ID', (req, res)=> {
    let judge = req.body;
    let updateQuery = `update judges
                       set name = '${judge.name}',
                       location = '${judge.address}'
                       where id = ${judge.judges_ID}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/judges/:id', (req, res)=> {
    let insertQuery = `delete from judges where id=${req.params.judges_ID}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
