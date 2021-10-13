import React, { useState, useEffect } from "react";

export default function FindPlace() {

	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [found, setFound] = useState(false);
	const [coord, setCoord] = useState(false);

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getCoordinates);
		} else {
			alert("Geolocation is not supported in this browsers");
		}
	}

	const getCoordinates = position => {
		setLongitude(position.coords.longitude);
    	setLatitude(position.coords.latitude);
	}

	useEffect(() => {
		if (!coord) {
			getLocation()
			setCoord(true)
		}
		console.log(latitude, longitude)
		// if (coord == true && !found && latitude != null && longitude != null) {
		// 	fetch(url)
		// 	.then(res => res.json())
		// 	.then(data => {
		// 		console.log(data)
		// 		setFound(true)

		// 	})
		// 	.catch(err => console.log(err))
		// }
	}, [coord, found, latitude, longitude])

	return <p></p>
}