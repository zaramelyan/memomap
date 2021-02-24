import React, { useState } from 'react'
import { Typography, Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import StyledButton from './StyledButton'
import { useHistory } from 'react-router-dom'

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
  }
}))

function LandingPage () {
  const history = useHistory()
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  const handleChange = (event) => {
    console.log(event.target.id)
    setLogin((prevLogin) => ({ ...prevLogin, [event.target.id]: event.target.value }))
  }

  const handleSubmit = () => {
    console.log(login)
    history.push('/map')
  }

  const classes = useStyles()

  return (
    <Box className={classes.root}>
    <Typography className={classes.title} color="primary">memomap</Typography>
    <TextField id="username" label="username" onChange={handleChange} value={login.username} />
    <TextField id="password" label="password" type="password" onChange={handleChange} value={login.password} />
    <StyledButton text="Log in" onClick={handleSubmit} />
    <StyledButton text="Sign up" />
    </Box>
  )
}

export default LandingPage
