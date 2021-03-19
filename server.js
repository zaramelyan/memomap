
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { verify } = require('jsonwebtoken')
const { hash, compare } = require('bcryptjs')
const { postSignup, getLogin, postEntry, getEntries, deleteEntry, checkUser } = require('./src/services/db')

// TODO: remove bodyparser?

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use((req, res, next) => {
  const { method, path } = req
  console.log(`New request of type ${method} to endpoint '${path}'`)
  next()
})

app.post('/login', async function (req, res) {
  const { username, password } = req.body
  const user = await checkUser(username)
  if (!user) {
    // TODO: Change error handler later
    throw new Error('no user')
  }
  const valid = await compare(password, user.password)
  if (!valid) {
    throw new Error('wrong password')
  }
  res.send(user)
})

app.post('/signup', async function (req, res) {
  const { firstName, lastName, username, password } = req.body
  try {
    const user = await checkUser(username)
    if (user) {
      return res.sendStatus(403)
    }
    const hashedPassword = await hash(password, 10)
    await postSignup(firstName, lastName, username, hashedPassword)
    res.sendStatus(201)
  } catch (err) {

  }
})

app.post('/map', async function (req, res) {
  const { userId, location, lng, lat, selectedDate, entry, entryName } = req.body
  await postEntry(userId, location, lng, lat, selectedDate, entry, entryName)
  res.sendStatus(200)
})

app.post('/entries', async function (req, res) {
  const { userId } = req.body
  const entries = await getEntries(userId)
  if (!entries) {
    // TODO: Change error handler later
    res.send({ error: 'no entries' })
  } else {
    res.send(entries)
  }
})

app.delete('/entries', async function (req, res) {
  const { entryId, userId } = req.body
  await deleteEntry(entryId, userId)
  res.sendStatus(200)
})

const port = process.env.PORT || 5000

app.listen(port)
console.log(`Running on port http://localhost:${port}`)
