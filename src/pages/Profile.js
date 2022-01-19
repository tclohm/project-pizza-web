import React, { useRef, useState, useEffect, useContext } from "react";
import Detail from "./Detail";
import TableCell from "../components/TableCell";
import { NetworkContext } from "../context/NetworkContext";

import mapboxgl from 'mapbox-gl';

export default function Profile() {

	const [data, setData] = useState([])

	const [results, setResults] = useState([])

    const [input, setInput] = useState("");

	const [dataReceived, setDataReceived] = useState(false)

	const [selected, setSelected] = useState("")

	const mapContainer = useRef(null);
  	const map = useRef(null)

	const { getVenuesPizza } = useContext(NetworkContext)

	useEffect(() => {
		if (dataReceived) { return }
	      		getVenuesPizza().then(res => {
	        	return res.json()
      		}).then(data => {
	    		if (data && data.venuepizzas) {
	    			setData(data.venuepizzas)
	    			setDataReceived(true)
    		}
    	})
	}, [getVenuesPizza, dataReceived])


	useEffect(() => {
    	const results = data.filter(obj => {
    		return obj.pizza_name.toLowerCase().includes(input.toLowerCase()) || obj.venue_name.toLowerCase().includes(input.toLowerCase())
    	})
    	setResults(results)
    }, [input, data])


    const store = (object) => {
		return {
			"type": "FeatureCollection",
			"features": [{
			"type": "Feature",
				"geometry": {
				    "type": "Point",
				    "coordinates": [
				      object.lon,
				      object.lat       
				    ],
				},
				"properties": {
					"id": `${object.id}`,
					"price": `${object.price}`
				},
			},
			]
		}
}


      

  const addMarker = store => {
    for (const marker of store.features) {
      const bubble = document.createElement('div');
      const pointer = document.createElement('div');
      const container = document.createElement('div');
      bubble.id = `marker-${marker.properties.id}`;
      pointer.id = `pointer-${marker.properties.id}`;
      bubble.className = 'bubble font-black';
      pointer.className = 'pointer';
      container.className = 'bubble-container';
      bubble.style.display = 'flex';
      bubble.style.justifyContent = 'center';
      bubble.textContent = `$${marker.properties.price}`
      container.append(pointer)
      container.append(bubble)

      new mapboxgl.Marker(container, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map.current)
    }
  }


	return (
		<div className="flex w-full">

			<div className="left bg-gray-200 lg:w-5/12 w-full h-screen overflow-y-auto snap-y">
				<div className="sticky top-0 bg-gray-200 shadow">
					<p 
					className="flex justify-start w-full font-semibold text-white px-2 py-1 bg-pink-500 text-xs z-10">
					Reviewed
					</p>
					<input 
		              className="flex overflow-ellipsis overflow-hidden ring-4 ring-gray-200 ring-inset focus:outline-none py-2 px-8 w-full rounded-lg"
		              type="text" 
		              name="location"
		              onChange={e => setInput(e.target.value)} 
		              placeholder="Search..."/>
	            </div>
				<div className="overflow-y-auto snap-y">
					{
						input.length !== 0 ?
						results.map((obj, id) => (
							<TableCell obj={obj} id={id} select={setSelected} />
	            		))
						:
						data.map((obj, id) => (
							<TableCell obj={obj} id={id} select={setSelected} />
	            	))}
            		<p className="flex justify-center text-gray-400 text-xs">empty all the way down</p>
            	</div>
			</div>
			
			<div className="right md:w-full">
					{
					selected === ""
					?
						<p>empty</p>
					:
						<div className="hidden md:flex md:flex-col">
						<div 
							ref={mapContainer} 
							className="flex flex-col justify-end h-48 w-full bg-yellow-200"></div>
						<Detail selected={selected}/>
							
						</div>
					}
			</div>

		</div>

	)
}