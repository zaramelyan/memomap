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
    password: '',
    error: null
  })

  const history = useHistory()

  useEffect(() => {
    const user = localStorage.getItem('userData')
    if (userData || user) {
      console.log('yes')
      history.replace('/map')
    }
  })

  const handleChange = (event) => {
    setSignup((prevSignup) => ({ ...prevSignup, [event.target.id]: event.target.value }))
  }

  const handleSubmit = async () => {
    if (!signup.username || !signup.password) {
      return
    }
    await postSignup(signup)
      .then((res) => {
        if (res === 201) {
          history.replace('/')
        }
        if (res === 403) {
          setSignup((prevSignup) => ({ ...prevSignup, error: 'user already exists' }))
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
      <TextField required id="username" label="username" onChange={handleChange} value={signup.username} />
      <TextField required id="password" label="password" type="password" onChange={handleChange} value={signup.password} />
      <StyledButton type="submit" text="Submit" onClick={handleSubmit} />
      {signup.error && <p>{signup.error}</p>}
    </form>
    </Box>
    </>
  )
}

export default SignUp
