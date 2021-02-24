import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import StyledButton from './StyledButton'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    justifyContent: 'center'
  },
  title: {
    flexGrow: 1,
    fontSize: 30,
    letterSpacing: 2
  }
}))

function Nav () {
  const classes = useStyles()
  return (
    <AppBar color="transparent" position="static" className={classes.root}>
      <Toolbar>
        <StyledButton><MenuIcon color="primary"/></StyledButton>
        <Typography className={classes.title} color="primary">memomap</Typography>
        <StyledButton text="Logout" />
      </Toolbar>
    </AppBar>
  )
}

export default Nav
