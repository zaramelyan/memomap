import React from 'react'
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    justifyContent: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(4)
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
        <Button disableRipple="true"><MenuIcon color="primary"/></Button>
        <Typography className={classes.title} color="primary">memomap</Typography>
        <Button disableRipple="true" className={classes.menuButton} color="primary">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
