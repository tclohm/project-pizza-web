import React, { useState, useRef, useEffect } from "react";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = `${process.env.REACT_APP_MB_KEY}`;

export default function Map({ location }) {

	const mapContainer = useRef(null)
	const map = useRef(null)

	const [zoom] = useState(13)

	const store = () => {
    return {
      "type": "FeatureCollection",
      "features": [
	      {
	  			"type": "Feature",
	  			"geometry": {
			  		"type": "Point",
			  		"coordinates": [location.lon, location.lat]
	  			},
			  	"properties": {
			  		"title": `${location.name}`,
			  		"description": 'pizza'
			  	}
	  		},
  		]
    }
  }

	const addMarkers = stores => {
		for (const marker of stores.features) {
			const bubble = document.createElement('div');
			const pointer = document.createElement('div');
			const container = document.createElement('div');
			bubble.id = `marker-${marker.properties.id}`;
			pointer.id = `pointer-${marker.properties.id}`;
			bubble.className = 'bubble font-black text-xs flex justify-center items-center';
			pointer.className = 'pointer';
			container.className = 'bubble-container';
			bubble.textContent = `$${marker.properties.description}`
			bubble.id = `${marker.properties.name}`
			container.append(pointer)
			container.append(bubble)

			new mapboxgl.Marker(container, { offset: [0, -23] })
				.setLngLat(marker.geometry.coordinates)
				.addTo(map.current)
			}
	}

	useEffect(() => {
		if (Object.keys(location).length === 0) return
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/light-v10',
			center: [location.lon, location.lat],
			zoom: zoom,
			interactive: false
		});
        
        map.current.on('load', () => {

          map.current.addSource('places', {
            'type': 'geojson',
            'data': store(),
          });
          addMarkers(store())
        });
	})

	useEffect(() => {
		if (Object.keys(location).length === 0) return
		if (map.current === null) return
		map.current.flyTo({
            center: [location.lon, location.lat],
            zoom: zoom
        })
	}, [zoom, location])


	return (
			<div 
				ref={mapContainer} 
				style={{
					height: "20vh"
				}}
				className="flex flex-col justify-end w-full">
			</div>
	)
}