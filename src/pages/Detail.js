import React from "react";

import PizzaImageNameVenue from "../components/PizzaImageNameVenue";


export default function Detail({ selected }) {

	const url = 'http://localhost:4000/v1/images/' + selected.pizza_image_id

	return (
		<div>
			<div className="flex flex-col lg:flex-row justify-between">
				<PizzaImageNameVenue input={selected} image={url} className="flex m-2"/>
				<div className="flex flex-col p-4 m-2 ring-1 ring-black rounded">
					<h4 className="font-semibold text-md">Address</h4>
					<p className="text-md">{selected.venue_address}</p>
					<p className="text-xs font-light">Visited on: {new Date(selected.created_at).toDateString()}</p>
				</div>
			</div>
			<p>The price you paid: ${selected.price}</p>
			<div className="flex justify-center">
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
		</div>
	)

}