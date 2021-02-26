import React, { useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import ReactMapGL, { Marker } from 'react-map-gl'
import { Fade } from '@material-ui/core'
import Pin from '../Pin'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Geocoder from 'react-map-gl-geocoder'

function Map ({ setLocation }) {
  const mapToken = 'pk.eyJ1IjoiemFybWVsIiwiYSI6ImNrNmdqb2diNTBuMXUzbm1sc25sMzZ4dzkifQ.9MWYdG8O5cT8nIn7TiedYw'

  const [viewport, setViewport] = useState({
    latitude: 59.91273,
    longitude: 10.74609,
    zoom: 2
  })

  const [mark, setMark] = useState({
    lat: 59.91273,
    lng: 10.74609
  })

  const mapRef = useRef()

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  )

  const location = async (event) => {
    if (event.target.className.includes('geocoder')) {
      setLocation('')
      return
    }

    setMark({ lat: event.lngLat[1], lng: event.lngLat[0] })
    await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${event.lngLat[0]},${event.lngLat[1]}.json?access_token=${mapToken}`)
      .then((res) => res.json())
      .then((location) => {
        // TODO: Clean this up..
        console.log(location.features)
        const city = location.features.filter(item => item.id.includes('place') || item.id.includes('region'))
        setLocation(city[0].place_name)
      })
      .catch((error) => {
        setLocation('')
        console.error('Error:', error)
      })
  }

  return (
        <Fade in timeout={1000}>
        <ReactMapGL
          ref={mapRef}
          mapboxApiAccessToken={mapToken}
          mapStyle='mapbox://styles/mapbox/streets-v8'
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={(viewport) => setViewport(viewport)}
          onClick={(event) => location(event)}
        >
        <Marker key={viewport.latitude} longitude={mark.lng} latitude={mark.lat} onClick={() => console.log('HELLO')}><Pin/></Marker>
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={mapToken}
          position="top-left"
          marker={false}
        />
        </ReactMapGL>
        </Fade>
  )
}

Map.propTypes = {
  setLocation: PropTypes.func
}

export default Map
