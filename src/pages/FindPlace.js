import React, { useState, useEffect } from "react";


export default function FindPlace({ latitude, longitude, add, modalRef, close }) {

    const [places, setPlaces] = useState([]);


    const callback = (results, status) => {
        console.log(results)
        console.log(status)
        if (status === "OK") setPlaces(results)
    }

    useEffect(() => {
        try {
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

        } catch (e) {
            console.error(e)
        }
    }, [latitude, longitude])

    return (
    <div className="relative mt-12 border rounded-r-xl bg-white w-11/12 shadow">
		<h1 className="text-gray-400 text-lg font-black my-4 px-8 border-b w-full">Around you</h1>
		<button 
			id="close" 
			className="absolute -right-4 top-3 text-gray-600 px-8"
			ref={modalRef}
			onClick={e => close(e)}>
		</button>
		<div>
			{places.map((obj, id) => (
				<button 
				key={id}
				className="flex justify-start items-center h-12 mt-1 px-8 w-full focus:outline-none font-bold text-gray-400 text-xs hover:bg-gray-200"
				onClick={
					(e) => {
						add({
							location: {
								name: obj.name,
								lat: obj.geometry.location.lat(),
								lon: obj.geometry.location.lng(),
								address: obj.vicinity,
							}
						})
						close(e)
					}
				}
				>
					{obj.name}
				</button>
			))}
			<input 
              className="flex overflow-ellipsis overflow-hidden focus:outline-none py-2 px-8 w-full border-b mb-8"
              type="text" 
              name="location" 
              placeholder="Dont see the restaurant where you ordered your pizza. Type it in here"/>
		</div>
	</div>
    )
}