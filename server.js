let express = require('express');
// const pool = require('../testHeroku/database');
let app = express();
let cors = require('cors');
let path = require('path');
const pool = require('./database');
let pathView = path.join(__dirname,'./public');
app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get('/doctor', async function (req,res) {
    
    let client = await pool.connect();
    let result = await client.query("Select * from doctor");
    let results = result.rows
    res.json(results);
    client.release();

})
// app.get('/page', function (req,res) {
//     res.sendFile(pathView + '/testHTML.html');
//     // res.json(["Sol7"]);
// })

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is running!");
})