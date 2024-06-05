const mysql = require('mysql2/promise');


const db = mysql.createPool({
    host: 'localhost', 
    port: 3306, 
    user: 'root', 
    password: 'poiujkL612345', 
    database: 'new_world', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;