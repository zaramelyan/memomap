import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'
import Entry from './Entry'

function EntryViewer ({ location, marker, setTrigger, setLocation }) {
  return (
    <Paper className="entry viewer">
    <Entry location={location} marker={marker} setTrigger={setTrigger} setLocation={setLocation}/>
    </Paper>
  )
}

EntryViewer.propTypes = {
  location: PropTypes.string,
  marker: PropTypes.object,
  setTrigger: PropTypes.func,
  setLocation: PropTypes.func
}

export default EntryViewer
