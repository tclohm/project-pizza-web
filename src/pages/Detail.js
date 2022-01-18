import React from "react";

import PizzaImageNameVenue from "../components/PizzaImageNameVenue";


export default function Detail({ selected }) {

	const url = 'http://localhost:4000/v1/images/' + selected.pizza_image_id

	return (
		<div>
			<PizzaImageNameVenue input={selected} image={url} className="flex"/>
			<div className="flex">
			<div className="flex flex-col items-center">
				<label
				 name="Cheesiness"
				 style={{ fontSize: '4.5rem' }}
				 className="h-8 w-8 m-6 lg:m-8 flex justify-center"
				>🧀</label>
				<p className="relative bottom-2 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{selected.cheesiness}</p>
			</div>
			<div className="flex flex-col items-center">
				<label
				 name="Flavor"
				 style={{ fontSize: '4.5rem' }}
				 className="h-8 w-8 m-6 lg:m-8 flex justify-center"
				>👅</label>
				<p className="relative bottom-2 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{selected.flavor}</p>
			</div>
			<div className="flex flex-col items-center">
				<label
				 name="Sauciness"
				 style={{ fontSize: '4.5rem' }}
				 className="h-8 w-8 m-6 lg:m-8 flex justify-center"
				>🍅</label>
				<p className="relative bottom-2 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{selected.sauciness}</p>
			</div>
			<div className="flex flex-col items-center">
				<label
				 name="Saltiness"
				 style={{ fontSize: '4.5rem' }}
				 className="h-8 w-8 m-6 lg:m-8 flex justify-center"
				>🧂</label>
				<p className="relative bottom-2 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{selected.saltiness}</p>
			</div>
			<div className="flex flex-col items-center">
				<label
				 name="Char"
				 style={{ fontSize: '4.5rem' }}
				 className="h-8 w-8 m-6 lg:m-8 flex justify-center"
				>🔥</label>
				<p className="relative bottom-2 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{selected.charness}</p>
			</div>
			
			</div>
			<p>created at: {selected.created_at}</p>
			
			<p>lat: {selected.lat}</p>
			<p>lon: {selected.lon}</p>
			<p>price: ${selected.price}</p>
			
			
			<p>Address: {selected.venue_address}</p>
		</div>
	)

}