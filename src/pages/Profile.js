import React, { useState, useEffect, useContext } from "react";

import { NetworkContext } from "../context/NetworkContext";

const url = 'http://localhost:4000/v1/images/';

export default function Profile() {

	const [data, setData] = useState([])
	const [dataReceived, setDataReceived] = useState(false)

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


	return (
		<div className="flex flex-col w-full">
			
			<div className="">

				<div className="flex justify-center">
					<img 
						className="rounded-full h-40 w-40 mx-2"
						src="placeholder.jpg" 
						alt="picture" />
					<div className="flex flex-col justify-center mx-2">
						<p>Taylor</p>
						<p>Los Angeles</p>
						<button
							className="text-sm font-semibold text-gray-900 bg-white py-2 px-4 rounded ring-1 ring-gray-900 shadow-sm z-10"
						>edit profile</button>
					</div>	
				</div>

			</div>

			<div className="middle">

			</div>

			<div className="bottom">
				<p>history of food reviewed</p>
				{data.map((obj, id) => (
					<div className="pl-2 py-2 w-80 border-b hover:bg-gray-100 cursor-pointer" key={id}>
						<div className="flex items-center">
						  <img className="h-12 w-12 rounded" src={url + `${obj.pizza_image_id}`} alt="pizza" />
						  <div className="px-2">
						  <p className="font-black">{obj.venue_name}</p>
						  <p className="font-extralight text-xs">{obj.venue_address}</p>
						  </div>
						</div>
					</div>
            	))}
			</div>
		</div>

	)
}