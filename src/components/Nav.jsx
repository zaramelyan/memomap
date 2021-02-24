import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import StyledButton from './StyledButton'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    justifyContent: 'center'
  },
  title: {
    flexGrow: 1,
    fontSize: 25,
    letterSpacing: 2
  }
}))

function Nav () {
  const classes = useStyles()
  const history = useHistory()

  const handleLogout = () => {
    history.push('/')
  }

  return (
    <AppBar color="transparent" position="static" className={classes.root}>
      <Toolbar>
        <StyledButton><MenuIcon color="primary"/></StyledButton>
        <Typography className={classes.title}>memomap</Typography>
        <StyledButton text="Logout" onClick={handleLogout} />
      </Toolbar>
    </AppBar>
  )
}

export default Nav
