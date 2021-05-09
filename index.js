const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
const con = mysql.createConnection({
    host: 'localhost',
    user:"root",
    password:"",
    database:"crud_db",
    multipleStatements: true
})

app.set('view engine', 'ejs');

app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: false}));

con.connect((err)=>{
    if(err) console.log("failed connecting");
    else console.log("Connected Successfulluy");
});

app.listen(5300, ()=>console.log("Listening to port 5300"));

app.get('/',(req, res) => {
    let sql = "SELECT * FROM first_table";
    let query = con.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('index', {
            title : 'Displaying Data items:',
            users : rows
        });
    });
});


app.get('/add',(req, res) => {
    res.render('newUser', {
        title : 'Create New Entry',
    });
});

app.post('/save',(req, res) => { 
    let data = {name: req.body.name, age: req.body.age};
    let sql = "INSERT INTO first_table SET ?";
    let query = con.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});


app.get('/edit/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `Select * from first_table where id = ${userId}`;
    let query = con.query(sql,(err, result) => {
        if(err) throw err;
        res.render('edit_data', {
            title : 'Edit Data',
            user : result[0]
        });
    });
});


app.post('/update',(req, res) => {
    const userId = req.body.id;
    let sql = "update first_table SET name='"+req.body.name+"',  age='"+req.body.age+"' where id = "+userId;
    let query = con.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});



app.get('/delete/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from first_table where id = ${userId}`;
    let query = con.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});