const mysql = require('mysql2');
const config = require('./config.json');

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

// Перевірка підключення
connection.connect((err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    }
});

module.exports = connection;
