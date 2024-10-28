const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'nightingale2',
    password: 'nightingale2',
    database: 'nightingale2'
});

module.exports = connection