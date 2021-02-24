import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFybWVsIiwiYSI6ImNrNmdqb2diNTBuMXUzbm1sc25sMzZ4dzkifQ.9MWYdG8O5cT8nIn7TiedYw';


export default function MapBox() {
 const [mapState, setMapState] = useState({
    lng: 5,
    lat: 34,
    zoom: 2
    })
    const mapContainer = useRef(null);
       const hello = () => {
           console.log("HELLO")
       }
    const mapper = (map) => {
        setMapState({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2)
            }); 
          
    }
        useEffect(() => {
            const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [mapState.lng, mapState.lat],
            zoom: mapState.zoom
            });
            
            var marker = new mapboxgl.Marker()
            .setLngLat([30.5, 50.5])
            .addTo(map);
            console.log(marker)


            map.on('click', function (event) {
                console.log(event)
                var coordinates = event.features[0].geometry.coordinates.slice();
                var description = event.features[0].properties.description;
                 
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                 
                new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
                });
            }, [mapState]
        );

        
                return (
                <div>
                    <div className='sidebarStyle'>
<div>Longitude: {mapState.lng} | Latitude: {mapState.lat} | Zoom: {mapState.zoom}</div>
</div>
                <div ref={el => (mapContainer.current = el)} className="mapContainer" onClick={() => console.log("hi")}/>
                </div>
                )
                
};
