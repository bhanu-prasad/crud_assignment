const mysql = require("mysql");

const con = mysql.createConnection({
    host: 'localhost',
    user:"root",
    password:"",
    database:"crud_db",
    multipleStatements: true
});

con.connect((err)=>{
    if(err) console.log("failed connecting");
    else console.log("Connected Successfulluy");
});

module.exports = con;