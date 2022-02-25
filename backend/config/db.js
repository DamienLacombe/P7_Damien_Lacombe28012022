const mysql = require("mysql2");
const dotenv = require("dotenv").config()

const config = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "groupomania"
}

const db = mysql.createConnection(config);

const util = require("util");
db.query = util.promisify(db.query).bind(db);

module.exports = db;
