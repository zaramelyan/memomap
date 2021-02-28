const express = require('express')
const cors = require('cors')
const { postSignup, getLogin } = require('./src/services/db')

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
  const user = await getLogin(username, password)
  if (!user) {
    // TODO: Change error handler later
    res.send({ error: 'no user' })
  } else {
    res.send(user)
  }
})

app.post('/signup', async function (req, res) {
  const { firstName, lastName, username, password } = req.body
  await postSignup(firstName, lastName, username, password)
  res.sendStatus(200)
})

const port = process.env.PORT || 5000

app.listen(port)
console.log(`Running on port http://localhost:${port}`)
