import React, { useState, useRef, useEffect } from "react";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = `${process.env.REACT_APP_MB_KEY}`;

export default function Map({ lng, lat, collection }) {
	const mapContainer = useRef(null)
	const map = useRef(null)

	const [zoom] = useState(13)

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
			bubble.textContent = `$${marker.properties.price}`
			bubble.id = `${marker.properties.name}`
			container.append(pointer)
			container.append(bubble)

			new mapboxgl.Marker(container, { offset: [0, -23] })
				.setLngLat(marker.geometry.coordinates)
				.addTo(map.current)
			}
	}

	useEffect(() => {
		if (Object.keys(collection).length === 0) return
		if (map.current) return
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/light-v10',
			center: [lng, lat],
			zoom: zoom,
			interactive: false
		});
        
        map.current.on('load', () => {

          map.current.addSource('places', {
            'type': 'geojson',
            'data': collection,
          });
          addMarkers(collection)
        });
	})

	useEffect(() => {
		if (Object.keys(collection).length === 0) return
		map.current.flyTo({
            center: [lng, lat],
            zoom: zoom
        })
	}, [lng, lat, zoom, collection])


	return (
			<div 
				ref={mapContainer} 
				style={{
					height: "60vh"
				}}
				className="flex flex-col justify-end w-full h-64">
			</div>
	)
}