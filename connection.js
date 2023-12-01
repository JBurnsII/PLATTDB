const {Client} = require('pg');

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

// const res = await client.query('SELECT * FROM judges')
// console.log(res)

// module.exports = client;
console.log("before query")
client.query("SELECT * FROM judges Where judges_id = 500", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

 
// const connectDb = async () => {
//     try {
//         const client = new Client({
//             user: "Advisr",
//             host: "tigradvisr.cmhpzn7cmtwl.us-east-1.rds.amazonaws.com",
//             database: "PLATTDB",
//             password: "Gotigers",
//             port: 5432,
//         })
 
//         await client.connect()
//         const res = await client.query('SELECT * FROM judges')
//         console.log(res)
//         await client.end()
//     } catch (error) {
//         console.log(error)
//     }
// }
 
// connectDb()
