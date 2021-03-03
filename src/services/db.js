const { Pool } = require('pg')
require('dotenv').config()
const camelCase = require('camelcase-keys')

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DB,
  password: process.env.DBPASS,
  port: process.env.DBPORT
})

const postSignup = (firstName, lastName, username, password) => {
  pool.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)', [firstName, lastName, username, password])
}

const postEntry = (userId, location, lng, lat, selectedDate, entry, entryName) => {
  pool.query('INSERT INTO entries (user_id, location, lng, lat, travel_date, entry, entry_name ) VALUES ($1, $2, $3, $4, $5, $6, $7)', [userId, location, lng, lat, selectedDate, entry, entryName])
}

const getEntries = async (userId) => {
  try {
    const user = await
    pool.query('SELECT * from entries WHERE user_id = $1', [userId])
    return camelCase(user.rows)
  } catch (err) {
    return err.stack
  }
}

const getLogin = async (username, password) => {
  try {
    const user = await
    pool.query('SELECT * from users WHERE username = $1 AND password = $2', [username, password])
    return camelCase(user.rows[0])
  } catch (err) {
    return err.stack
  }
}

const deleteEntry = (entryId, userId) => {
  pool.query('DELETE FROM entries WHERE entry_id = $1 AND user_id = $2', [entryId, userId])
}

module.exports = {
  postSignup,
  getLogin,
  postEntry,
  getEntries,
  deleteEntry
}
