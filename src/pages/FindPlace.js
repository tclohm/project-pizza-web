import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { PizzaInputContext } from "../context/PizzaInputContext";

export default function FindPlace() {
	
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [coord, setCoord] = useState(false);
	const [area, setArea] = useState(true);
	const [places, setPlaces] = useState([]);

	const { add } = useContext(PizzaInputContext);
	const history = useHistory();

	const getCoordinates = position => {
		setLongitude(position.coords.longitude);
    	setLatitude(position.coords.latitude);
	}

	const callback = (results, status) => {
		console.log(results)
		if (status === "OK") setPlaces(results)
	}

	useEffect(() => {
		const getLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(getCoordinates);
			} else {
				alert("Geolocation is not supported in this browsers");
			}
		}	
		if (!coord) {
			getLocation()
			setCoord(true)
		}
	}, [coord, latitude, longitude])

	useEffect(() => {
		if (latitude !== null && longitude !== null && coord === true && area === true) {
			const current = new window.google.maps.LatLng(latitude, longitude);
			const map = new window.google.maps.Map(document.getElementById("map"), {
				center: current,
				zoom: 15
			});

			const request = {
				location: current,
				radius: "500",
				type: ["restaurant"]
			};

			const service = new window.google.maps.places.PlacesService(map);
			service.nearbySearch(request, callback)
			setArea(false)
		}
	}, [latitude, longitude, coord, area])

	return (
	<div className="mt-12">
		<div id="map"/>
		<h1 className="text-gray-400 text-lg font-black ml-8">Around you</h1>
		<div>
			{places.map((obj, id) => (
				<button 
				key={id}
				className="flex justify-start items-center h-12 mt-4 px-8 w-full focus:outline-none font-bold text-gray-400 text-xs hover:bg-gray-200"
				onClick={e => {
					add({
						location: {
							venueName: obj.name,
							lat: null,
							lon: null,
							address: obj.vicinity,
						}
					})
					history.push("/")
				}}
				>
					{obj.name}
				</button>
			))}
			<input 
              className="w-full overflow-ellipsis overflow-hidden focus:outline-none py-2 px-8 border-b mb-8"
              type="text" 
              name="location" 
              placeholder="Dont see the restaurant where you ordered your pizza. Type it in here"/>
		</div>
	</div>
	)
}