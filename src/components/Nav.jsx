import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import PropTypes from 'prop-types'
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
  const { userData, setUserData } = useContext(UserContext)
  const classes = useStyles()
  const history = useHistory()
  const handleLogout = () => {
    setUserData(null)
    history.push('/')
  }

  return (
    <AppBar variant="outlined" color="transparent" position="static" className={classes.root}>
      <Toolbar>
        <StyledButton><MenuIcon color="primary"/></StyledButton>
        <Typography className={classes.title}>memomap</Typography>
        <p>{ userData && userData.firstName}</p>
        <StyledButton text="Logout" onClick={handleLogout} />
      </Toolbar>
    </AppBar>
  )
}

Nav.propTypes = {
  setUserData: PropTypes.func
}

export default Nav
