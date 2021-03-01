
/* eslint-disable */
import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import StyledButton from '../StyledButton'
import { postEntry } from '../../services/functions'

function Entry ({ location, marker, setTrigger }) {
  const { userData } = useContext(UserContext)
  const [selectedDate, setSelectedDate] = useState('12-12-2020')
  const [entry, setEntry] = useState({ entryTitle: '', entryText: '' })
  const handleDateChange = (event) => {
    setSelectedDate(event)
  }
  const [submitted, setSubmitted] = useState(false)

  const handleEntryChange = (event) => {
    setEntry((prevEntry) => ({ ...prevEntry, [event.target.id]: event.target.value }))
  }
  const clearEntry = () => {
    setEntry({ entryTitle: '', entryText: '' })
  }

  const submitEntry = async () => {
    if (!entry.entryTitle || !entry.entryText) {
      return
    }
    const entryForm = {
      userId: userData.userId,
      location,
      lng: marker.lng,
      lat: marker.lat,
      selectedDate,
      entryName: entry.entryTitle,
      entry: entry.entryText
    }
    await postEntry(entryForm)
    .then((res) => console.log(res))
    .then(setSubmitted(true))
    .catch((err) => console.log(err))
  }

  const handleClose = () => {
    setSubmitted(false)
    clearEntry()
    setTrigger(true)
  }

  return (
  <div className="entry-form">
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
{ !submitted &&  
    <div> 
      <StyledButton text='Submit' onClick={submitEntry}/>
      <StyledButton text='Clear' onClick={clearEntry}/>
    </div>}
  {submitted && <div><p>Entry submitted!</p>
    <StyledButton text='close' onClick={handleClose} />
    </div>}
  </div>
  )
}

Entry.propTypes = {
  marker: PropTypes.object,
  location: PropTypes.string,
  setTrigger: PropTypes.func
}

export default Entry
