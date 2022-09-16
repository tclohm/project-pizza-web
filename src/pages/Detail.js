import React from "react";

import PizzaImageNameVenue from "../components/PizzaImageNameVenue";


export default function Detail({ pizza }) {

	const url = 'http://localhost:4000/v1/images/' + pizza.pizza_image_id

	return (
		<div>
			<div className="flex flex-col justify-between">
				<div className="flex justify-between border-b mx-2">
					<p className="absolute bg-green-500 rounded-full text-white h-8 w-8 flex justify-center items-center font-semibold text-xs shadow">
						${pizza.price}
					</p>
					<PizzaImageNameVenue input={pizza} image={url} className="flex m-2"/>
					<p className="font-light text-xs">{new Date(pizza.created_at).toDateString()}</p>
				</div>
				<div className="absolute right-2">
					<div className="flex justify-center mt-4 xl:mt-10">
						<div className="flex flex-col items-center">
							<label
							 name="Cheesiness"
							 style={{ fontSize: '2rem' }}
							 className="h-8 w-8 flex justify-center"
							>🧀</label>
							<p className="relative bottom-0 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{pizza.cheesiness}</p>
						</div>
						<div className="flex flex-col items-center">
							<label
							 name="Flavor"
							 style={{ fontSize: '2rem' }}
							 className="h-8 w-8 flex justify-center"
							>👅</label>
							<p className="relative bottom-0 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{pizza.flavor}</p>
						</div>
						<div className="flex flex-col items-center">
							<label
							 name="Sauciness"
							 style={{ fontSize: '2rem' }}
							 className="h-8 w-8 flex justify-center"
							>🍅</label>
							<p className="relative bottom-0 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{pizza.sauciness}</p>
						</div>
						<div className="flex flex-col items-center">
							<label
							 name="Saltiness"
							 style={{ fontSize: '2rem' }}
							 className="h-8 w-8 flex justify-center"
							>🧂</label>
							<p className="relative bottom-0 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{pizza.saltiness}</p>
						</div>
						<div className="flex flex-col items-center">
							<label
							 name="Char"
							 style={{ fontSize: '2rem' }}
							 className="h-8 w-8 flex justify-center"
							>🔥</label>
							<p className="relative bottom-0 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{pizza.charness}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

}