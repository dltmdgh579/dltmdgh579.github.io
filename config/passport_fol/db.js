var mysql = require('mysql2');

var pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'govl159159!',
    database:'user'
});

module.exports = pool