import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

function StyledButton ({ onClick, text, children }) {
  return (
    <Button disableRipple={true} onClick={onClick}>
      {text}
      {children}
    </Button>
  )
}

StyledButton.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
}

export default StyledButton
