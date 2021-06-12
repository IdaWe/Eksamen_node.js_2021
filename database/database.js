const mysql = require('mysql');
require('dotenv').config();
const bodyParser = require('body-parser');


const connection = mysql.createConnection({
    host: process.env.HOST,
    //port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


connection.connect((error) => {
    if (error) {
        console.log("Error: " + error);
    }
    else {
        console.log('Database connected successfully...');
    }
});

// eksportere variablen connection så den kan bruges i andre filer hvor den bliver importeret med require
module.exports = {
    connection: connection
};
