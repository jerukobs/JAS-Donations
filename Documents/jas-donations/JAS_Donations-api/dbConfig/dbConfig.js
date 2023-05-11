const sql = require('mysql')

const db = sql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "jas_donation",
})

module.exports = db