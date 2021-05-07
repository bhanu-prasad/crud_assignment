const express = require('express');

const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
const con = mysql.createConnection({
    host: 'localhost',
    user:"root",
    password:"",
    database:"crud_db",
    multipleStatements: true
})

con.connect((err)=>{
    if(err) console.log("failed connecting");
    else console.log("Connected Successfulluy");
});

app.listen(5300, ()=>console.log("Listening to port 5300"));

app.get("/users", (req,res)=>{
    con.query("select * from first_table", (err,rows,fields)=>{
        if(!err) res.send(rows);
        else console.log(err);
    });
});

app.get("/users/:id", (req,res)=>{
    con.query("select * from first_table where id = ?", [req.params.id] ,(err,rows,fields)=>{
        if(!err) res.send(rows);
        else console.log(err);
    });
});

app.delete("/users/:id", (req,res)=>{
    con.query("delete from first_table where id = ?", [req.params.id] ,(err,rows,fields)=>{
        if(!err) res.send(`deleted user with ${req.params.id}`);
        else console.log(err);
    });
});

app.post('/users', (req, res) => {
    let usr = req.body;
    var sql = "SET @id = ?;SET @name = ?;SET @age = ?; \
    CALL userAddOrEdit (@id,@name,@age);";
    con.query(sql, [usr.id, usr.name, usr.age], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted User id : '+element[0].id);
            });
        else
            console.log(err);
    });
});

//Update an employees
app.put('/users', (req, res) => {
    let usr = req.body;
    var sql = "SET @id = ?;SET @name = ?;SET @age = ?; \
    CALL userAddOrEdit (@id,@name,@age);";
    con.query(sql, [usr.id, usr.name, usr.age], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});
