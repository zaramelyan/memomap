import React, { useState } from 'react'
import Map from './Map'
import Nav from '../Nav'
import EntryViewer from '../EntryViewer'

function MapContainer () {
  const [location, setLocation] = useState('')
  return (
    <>
    <Nav />
    <div id="map-container">
      <Map setLocation={setLocation}/>
      <EntryViewer location={location}/>
    </div>
    </>
  )
};

export default MapContainer
