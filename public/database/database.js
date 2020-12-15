const mysql = require('mysql2/promise')
const config = require('./config')

module.exports.createConnection = function createConnection() {
  return mysql.createConnection(config)
}

function getUsers() {
  return new Promise((resolve, reject) => {
    const connect = createConnection()

    connect.query('SELECT * FROM users', (err, results, fields) => {
      if (err) reject(err)

      resolve(results)
    })
  
    connect.end()
  })
}