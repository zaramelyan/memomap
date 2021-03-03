import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
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
  },
  user: {
    paddingLeft: 10
  }
}))

function Nav () {
  const { userData, setUserData } = useContext(UserContext)
  const classes = useStyles()
  const history = useHistory()
  const handleLogout = () => {
    localStorage.removeItem('userData')
    setUserData(null)
    history.push('/')
  }

  return (
    <AppBar variant="outlined" color="transparent" position="static" className={classes.root}>
      <Toolbar>
      <AccountCircleIcon color="primary" /><p className={classes.user}>{ userData && userData.username }</p>
        <Typography className={classes.title}>memomap</Typography>
        <StyledButton text="Logout" onClick={handleLogout} />
      </Toolbar>
    </AppBar>
  )
}

Nav.propTypes = {
  setUserData: PropTypes.func
}

export default Nav
