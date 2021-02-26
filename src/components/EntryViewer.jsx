import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'

function EntryViewer ({ location }) {
  return (
    <Paper className="entry-viewer">{location}</Paper>
  )
}

EntryViewer.propTypes = {
  location: PropTypes.string
}

export default EntryViewer
