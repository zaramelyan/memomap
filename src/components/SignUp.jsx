import React, { useState } from 'react'
import { Typography, TextField, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import StyledButton from './StyledButton'
import { postSignup } from '../services/functions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    height: 50,
    fontSize: 30,
    letterSpacing: 2
  }
}))

function SignUp () {
  const classes = useStyles()
  const [signup, setSignup] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  })

  const handleChange = (event) => {
    console.log(event.target.id, event.target.value)
    setSignup((prevSignup) => ({ ...prevSignup, [event.target.id]: event.target.value }))
  }

  const handleSubmit = async () => {
    await postSignup(signup.firstName, signup.lastName, signup.username, signup.password)
      .then((res) => console.log('done'))
      .catch((err) => console.log(err))
  }

  return (
    <>
    <Box className={classes.root}>
    <Typography className={classes.title}>Sign Up</Typography>
    <form className={classes.root} >
      <TextField required id="firstName" label="first name" onChange={handleChange} value={signup.firstName} />
      <TextField required id="lastName" label="last name" onChange={handleChange} value={signup.lastName} />
      <TextField required id="username" label="username" onChange={handleChange} value={signup.username} />
      <TextField required id="password" label="password" type="password" onChange={handleChange} value={signup.password} />
      <StyledButton type="submit" text="Submit" onClick={handleSubmit} />
    </form>
    </Box>
    </>
  )
}

export default SignUp
