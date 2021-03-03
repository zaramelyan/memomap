import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Button, Typography } from '@material-ui/core/'
import { UserContext } from '../../context/UserContext'
import { deleteEntry } from '../../services/functions'
import StyledButton from '../StyledButton'

const useStyles = makeStyles({
  title: {
    fontSize: 20
  },
  text: {
    fontSize: 14,
    lineHeight: 1.5,
    marginBottom: 12
  }
})

function EntryCard ({ selectedEntry, setSelectedEntry, setTrigger }) {
  const { userEntries } = useContext(UserContext)
  const thisEntry = userEntries.filter(entry => entry.entryId === selectedEntry)
  const entryObj = thisEntry[0]
  const formattedDate = entryObj.travelDate.slice(0, 10).split('-').reverse().join('/')

  // X out entry window
  const removeEntryBox = () => {
    setSelectedEntry(null)
  }

  const handleDelete = async () => {
    const checker = confirm('Are you sure?')
    if (checker) {
      await deleteEntry(entryObj.entryId, entryObj.userId)
        .then((res) => {
          if (res === 200) {
            alert('Entry deleted')
          }
        })
      removeEntryBox()
      setTrigger(true)
    }
  }

  const classes = useStyles()

  return (
    <Paper className="entry viewer">
       <div className="button-div-top">
        <Button size="small" onClick={removeEntryBox}>X</Button>
        </div>
        <div className="entry text">
          <div className="entry elem location">
            <Typography color="textSecondary">
              {entryObj.location}
            </Typography>
          </div>
          <div className="entry elem">
            <Typography>
              {formattedDate}
            </Typography>
          </div>
          <div className="entry elem">
            <Typography variant="h1" className={classes.title}>
              {entryObj.entryName}
            </Typography>
          </div>
          <div className="entry elem">
            <Typography variant="body1" className={classes.text} >
              {entryObj.entry}
            </Typography>
          </div>
        </div>
        <div className="button-div-bottom">
          <StyledButton text={'Edit'}/>
          <StyledButton text={'Delete'}onClick={handleDelete} />
        </div>
    </Paper>
  )
}

EntryCard.propTypes = {
  selectedEntry: PropTypes.number,
  setSelectedEntry: PropTypes.func,
  setTrigger: PropTypes.func
}

export default EntryCard
