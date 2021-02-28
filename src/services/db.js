/* eslint-disable */
const { Pool } = require('pg')
require('dotenv').config()
const camelCase = require('camelcase-keys')

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DB,
  password: process.env.DBPASS,
  port: process.env.DBPORT,
})

const postSignup = (firstName, lastName, username, password) => {
  pool.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)', [firstName, lastName, username, password])
}

const getLogin = async (username, password) => {
  try {
const user = await
 pool.query('SELECT * from users WHERE username = $1 AND password = $2', [username, password])
  return camelCase(user.rows[0])
} catch (err) {
  return err.stack;
}
} 

module.exports = {
  postSignup,
  getLogin
}