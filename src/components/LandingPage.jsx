import React from 'react'
import { Typography, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuButton: {
    height: 20
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
    <Typography className={classes.title}>memomap</Typography>
    <Button className={classes.menuButton}>Log in</Button>
    <Button className={classes.menuButton}>Sign up</Button>
    </Box>
  )
}

export default LandingPage
