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

app.get('/judges/:id', (req, res)=>{
    client.query(`Select * from judges where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
client.connect();

app.post('/judges', (req, res)=> {
    const judge = req.body;
    let insertQuery = `insert into judges(id, name, address) 
                       values(${judge.id}, '${judge.name}', '${judge.address}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/judges/:id', (req, res)=> {
    let judge = req.body;
    let updateQuery = `update judges
                       set name = '${judge.name}',
                       location = '${judge.address}'
                       where id = ${judge.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/judges/:id', (req, res)=> {
    let insertQuery = `delete from judges where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
