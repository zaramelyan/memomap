import React, { useState, useCallback, useRef, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import PropTypes from 'prop-types'
import ReactMapGL, { Marker } from 'react-map-gl'
import { Pin, EntryPin } from '../Pins/Pin'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Geocoder from 'react-map-gl-geocoder'
import EntryViewer from '../Entry'
import { getEntries } from '../../services/functions'
import EntryCard from '../Entry/EntryCard'

function Map () {
  /* eslint-disable */
  const { userData, userEntries, setUserEntries } = useContext(UserContext)
  const mapToken = 'pk.eyJ1IjoiemFybWVsIiwiYSI6ImNrNmdqb2diNTBuMXUzbm1sc25sMzZ4dzkifQ.9MWYdG8O5cT8nIn7TiedYw'

  const [viewport, setViewport] = useState({
    latitude: 59.91273,
    longitude: 10.74609,
    zoom: 2
  })
  const [marker, setMarker] = useState({
    lat: 59.91273,
    lng: 10.74609
  })
  const [location, setLocation] = useState('')
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [trigger, setTrigger] = useState(false)
  const mapRef = useRef()

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  )

  useEffect(() => {
    getEntries(userData.userId)
      .then(res => res.json())
      .then(entries => {
        if (entries.error) {
          return console.log(entries.error)
        }
        setUserEntries(entries)
      })
    setTrigger(false)
  }, [trigger])


  const handleEntryClick = (entryId) => {
    setSelectedEntry(entryId)
  }

  const handleLocation = async (event) => {
    try {
    // Don't set marker when clicking geocoder search bar
      if (!event.target.className.includes('overlays')) {
        setLocation('')
        return
      }

      setMarker({ lat: event.lngLat[1], lng: event.lngLat[0] })
      await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${event.lngLat[0]},${event.lngLat[1]}.json?access_token=${mapToken}`)
        .then((res) => res.json())
        .then((location) => {
          // TODO: Clean this up..
          const city = location.features.filter(item => item.id.includes('place') || item.id.includes('region'))
          setLocation(city[0].place_name)
        })
        .catch((error) => {
          setLocation('')
          console.error(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
        <ReactMapGL
          ref={mapRef}
          mapboxApiAccessToken={mapToken}
          mapStyle='mapbox://styles/mapbox/streets-v8'
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={(viewport) => setViewport(viewport)}
          onClick={(event) => handleLocation(event)}
        >
        <Marker key={viewport.latitude} longitude={marker.lng} latitude={marker.lat}><Pin/></Marker>
        {userEntries && userEntries.map( entry => <div key={entry.entryId} onClick={(e => handleEntryClick(entry.entryId))}><Marker longitude={+entry.lng} latitude={+entry.lat} ><EntryPin /></Marker></div>)}
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={mapToken}
          position="top-left"
          marker={false}
        />
        </ReactMapGL>
         {location && <EntryViewer location={location} marker={marker} setTrigger={setTrigger}/>}
         {selectedEntry && <EntryCard  selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry} />}
      </>
  )
}

Map.propTypes = {
  setLocation: PropTypes.func
}

export default Map
