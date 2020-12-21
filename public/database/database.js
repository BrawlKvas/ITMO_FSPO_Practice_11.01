const mysql = require('mysql2/promise')
const config = require('./config')

module.exports.createConnection = function createConnection() {
  return mysql.createConnection(config)
}