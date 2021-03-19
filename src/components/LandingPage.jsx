import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { Typography, Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import StyledButton from './StyledButton'
import { useHistory } from 'react-router-dom'
import { getUser } from '../services/fetchers'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    height: 50,
    fontSize: 30,
    letterSpacing: 2
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

function LandingPage () {
  const { userData, setUserData } = useContext(UserContext)

  const classes = useStyles()
  const history = useHistory()
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  useEffect(() => {
    if (userData) {
      history.replace('/map')
    }
    const user = JSON.parse(localStorage.getItem('userData'))
    if (user && !userData) {
      setUserData(user)
    }
  })

  const handleChange = (event) => {
    setLogin((prevLogin) => ({ ...prevLogin, [event.target.id]: event.target.value }))
  }

  const handleLogin = async () => {
    if (!login.username || !login.password) {
      return
    }
    await getUser(login.username, login.password)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          return console.log(data.error)
        }
        setUserData(data)
        localStorage.setItem('userData', JSON.stringify(data))
        history.push('/map')
      })
      .catch(error => console.log(error))
  }

  const handleRedirect = () => {
    history.push('/signup')
  }

  return (
      <Box className={classes.root}>
        <div className="background"></div>
        <Typography className={classes.title} color="primary">memomap</Typography>
        <form className={classes.form}>
        <TextField required id="username" label="username" onChange={handleChange} value={login.username} />
        <TextField required id="password" label="password" type="password" onChange={handleChange} value={login.password} />
        <StyledButton text="Log in" onClick={handleLogin} />
        <StyledButton id="signup" text="Sign up" onClick={handleRedirect} />
        </form>
      </Box>
  )
}

export default LandingPage
