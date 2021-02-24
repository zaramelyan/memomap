import React, { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import Pin from './Pin'

function Map () {
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

  const location = async (event) => {
    setMark({ lat: event.lngLat[1], lng: event.lngLat[0] })
    await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${event.lngLat[0]},${event.lngLat[1]}.json?access_token=${mapToken}`)
      .then((res) => res.json())
      .then((location) => console.log(location.features[1].place_name))
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
        <ReactMapGL
          mapboxApiAccessToken={mapToken}
          mapStyle='mapbox://styles/mapbox/streets-v8'
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={(viewport) => setViewport(viewport)}
          onClick={(event) => location(event)}
        >
        <Marker key={viewport.latitude} longitude={mark.lng} latitude={mark.lat} onClick={() => console.log('HELLO')}><Pin/></Marker>
        </ReactMapGL>
  )
};

export default Map
