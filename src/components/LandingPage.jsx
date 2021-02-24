import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import StyledButton from './StyledButton'

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
  const classes = useStyles()
  return (
    <Box className={classes.root}>
    <Typography className={classes.title} color="primary">memomap</Typography>
    <StyledButton text="Log in" />
    <StyledButton text="Sign up" />
    </Box>
  )
}

export default LandingPage
