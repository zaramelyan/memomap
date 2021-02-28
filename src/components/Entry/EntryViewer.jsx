import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography } from '@material-ui/core'
import Entry from './Entry'

function EntryViewer ({ location }) {
  return (
    <Paper className="entry-viewer">
    <Typography>{location}</Typography>
    <Entry location={location}/>
    </Paper>
  )
}

EntryViewer.propTypes = {
  location: PropTypes.string
}

export default EntryViewer
