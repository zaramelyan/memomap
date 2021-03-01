/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { UserContext } from '../../context/UserContext'

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})
/* eslint-disable */
function EntryCard ({ selectedEntry, setSelectedEntry }) {
  const {userEntries} = useContext(UserContext)
  const thisEntry = userEntries.filter(entry => entry.entryId === selectedEntry)
  
  const removeEntry = () => {
    setSelectedEntry(null)
  }
  
  const classes = useStyles()

  return (
    <Card className="entry-viewer">
       <CardActions>
        <Button size="small" onClick={removeEntry}>X</Button>
      </CardActions>
      <CardContent>
      <Typography>
          {thisEntry[0].location}
        </Typography>
        <Typography>
          {thisEntry[0].travelDate.slice(0, 10)}
        </Typography>
        <Typography>
          {thisEntry[0].entryName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {thisEntry[0].entry}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  )
}

export default EntryCard
