/* eslint-disable */
import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import Map from './Map'
import Nav from '../Nav'
import EntryViewer from '../Entry/EntryViewer'
import { useHistory } from 'react-router-dom'

function MapContainer () {
  const {userData} = useContext(UserContext)
  const history = useHistory()

  if (!userData) {
    history.replace('/')
  }
  return (
    <>
    <Nav />
    <div id="map-container">
      <Map />
    </div>
    </>
  )
};

export default MapContainer
