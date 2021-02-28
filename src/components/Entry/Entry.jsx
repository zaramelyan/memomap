
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import StyledButton from '../StyledButton'

function Entry ({ location, marker }) {
  const [selectedDate, setSelectedDate] = useState()
  const [entry, setEntry] = useState({ entryTitle: '', entryText: '' })

  const handleDateChange = (event) => {
    setSelectedDate(event)
  }

  const handleEntryChange = (event) => {
    setEntry((prevEntry) => ({ ...prevEntry, [event.target.id]: event.target.value }))
  }
  const clearEntry = () => {
    setEntry({ entryTitle: '', entryText: '' })
  }

  const submitEntry = () => {
    if (!entry.entryTitle || !entry.entryText) {
      return
    }

    console.log(entry)
  }

  return (
  <div className='entry-form'>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
   <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date of travel"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
        </MuiPickersUtilsProvider>
  <TextField label="Title" id='entryTitle' onChange={handleEntryChange} value={entry.entryTitle}/>
  <TextField label="Entry text" id='entryText' fullWidth={true} multiline={true} onChange={handleEntryChange} value={entry.entryText} />
  <StyledButton text='Submit' onClick={submitEntry}/>
  <StyledButton text='Clear' onClick={clearEntry}/>
  </div>
  )
}

Entry.propTypes = {
  marker: PropTypes.object,
  location: PropTypes.string
}

export default Entry
