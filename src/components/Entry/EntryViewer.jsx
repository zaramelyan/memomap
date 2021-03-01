import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography } from '@material-ui/core'
import Entry from './Entry'

function EntryViewer ({ location, marker, setTrigger }) {
  return (
    <Paper className="entry-viewer">
    <Typography>{location}</Typography>
    <Entry location={location} marker={marker} setTrigger={setTrigger} />
    </Paper>
  )
}

EntryViewer.propTypes = {
  location: PropTypes.string,
  marker: PropTypes.object,
  setTrigger: PropTypes.func
}

export default EntryViewer
