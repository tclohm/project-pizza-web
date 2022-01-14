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
		<div className="flex w-full">

			<div className="left bg-gray-200 w-1/4 h-screen">
				<p 
				className="flex justify-start w-full font-semibold text-white px-2 py-1 bg-pink-500 text-xs z-10">
				Reviewed
				</p>
				<div className="overflow-y-auto snap-y">
				{data.map((obj, id) => (
					<div className="pl-2 py-2 border-b rounded hover:bg-gray-100 cursor-pointer bg-white" key={id}>
						<div className="flex items-center">
						  <img className="h-12 w-12 rounded-full" src={url + `${obj.pizza_image_id}`} alt="pizza" />
						  <div className="px-2 text-xs">
						  <p className="font-extralight">{obj.pizza_name}</p>
						  <p className="font-black">{obj.venue_name}</p>
						  <p className="text-gray-500 font-semibold">{new Date(obj.created_at).toDateString()}</p>
						  </div>
						</div>
					</div>
            	))}
            	<p className="flex justify-center text-gray-400 text-xs">empty all the way down</p>
            	</div>
			</div>
			
			<div className="right">

				<div className="flex justify-center">
					<img 
						className="rounded-full h-40 w-40 mx-2"
						src="placeholder.jpg" 
						alt="profile" />
					<div className="flex flex-col justify-center mx-2">
						<p>Taylor</p>
						<p>Los Angeles</p>
						<button
							className="text-sm font-semibold text-gray-900 bg-white py-2 px-4 rounded ring-1 ring-gray-900 shadow-sm z-10"
						>edit profile</button>
					</div>	
				</div>

				<div className="bottom">

				</div>

			</div>

		</div>

	)
}