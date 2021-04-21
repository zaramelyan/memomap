import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Typography, TextField, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import StyledButton from './StyledButton'
import { postSignup } from '../services/fetchers'
import { useHistory } from 'react-router-dom'

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
  const { userData } = useContext(UserContext)
  const classes = useStyles()
  const [signup, setSignup] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  })
  const [error, setError] = useState({
    username: '',
    password: ''
  })
  const [success, setSuccess] = useState(false)

  const history = useHistory()

  useEffect(() => {
    const user = localStorage.getItem('userData')
    if (userData || user) {
      history.replace('/map')
    }
  })

  const handleChange = (event) => {
    setSignup((prevSignup) => ({ ...prevSignup, [event.target.id]: event.target.value }))
  }

  const handleRedirect = () => {
    history.replace('/')
  }

  const handleSubmit = async () => {
    setError({ username: '', password: '' })
    if (!signup.username || !signup.password) {
      return
    }
    if (signup.password.length < 6) {
      return setError((prevError) => ({ ...prevError, password: 'password too short' }))
    }
    console.log(signup)
    await postSignup(signup)
      .then((res) => {
        console.log(res)
        if (res === 400) {
          setError((prevError) => ({ ...prevError, username: 'user already exists' }))
        }
        if (res === 201) {
          setSuccess(true)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
    <Box className={classes.root}>
    <Typography className={classes.title}>Sign Up</Typography>
    <form className={classes.root} >
      <TextField required id="firstName" label="first name" onChange={handleChange} value={signup.firstName} />
      <TextField required id="lastName" label="last name" onChange={handleChange} value={signup.lastName} />
      <TextField required error={error.username} helperText={error.username} id="username" label="username" onChange={handleChange} value={signup.username} />
      <TextField required error={error.password} helperText={error.password} inputProps={{ min: 6 }} id="password" label="password" type="password" onChange={handleChange} value={signup.password} />
      <StyledButton type="submit" text="Submit" onClick={handleSubmit} />
    </form>
    {success && <><Typography>User created successfully</Typography><StyledButton type="submit" text="Take me to login" onClick={handleRedirect} /></>}
    </Box>
    </>
  )
}

export default SignUp
