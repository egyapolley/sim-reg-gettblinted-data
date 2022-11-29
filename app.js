const mysql = require("mysql2")
require("dotenv").config()
const moment = require("moment")
const csv = require("fast-csv")

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})
const yesterday = moment().subtract(1, "day").format("YYYY-MM-DD")
const outputFile = `${process.env.INPUT_DIR}${moment().format("YYYY-MM-DD")}.lst`

const sql = `select msisdn, ghCard, business from tbllinked where dateAdded like '${yesterday}%'`


connection.query(sql, (err, result) => {
    if (err) {
        console.log(err)

    } else {
        if (result.length > 0) {
            let final_data = []
            for (const data of result) {
                final_data.push(data)

            }
            csv.writeToPath(outputFile, final_data, {headers: false})

        }
        
    }

    connection.end(err => {
        if (err) console.log(err)


    })

})








