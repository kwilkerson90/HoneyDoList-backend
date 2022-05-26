const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "goodworks17",
    host: "localhost", 
    port: 5432,
    database: "stacktodo"
});

module.exports = pool; 