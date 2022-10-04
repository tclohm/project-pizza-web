import React from "react";

export default function TableCell({ obj, select }) {

	console.log(obj)

	const url = (image_id) => {
		return 'http://localhost:4000/v1/images/' + image_id
	}

	return (
		<div 
			onClick={ () => select(obj) }
			className="flex flex-row pl-2 py-2 border-b hover:bg-gray-100 cursor-pointer bg-white" 
			>
			<div className="w-full flex justify-between items-center">
			  <div className="px-2 text-xs">
			  	<p className="font-black">{obj.venue_name}</p>
			  	<p className="text-gray-500 font-semibold">{obj.venue_address}</p>
			  	<p>{obj.pizzas.length} {obj.pizzas.length > 1 ? "pizzas" : "pizza"} reviewed</p>
			  </div>
			  <div>
				<img
				src={url(obj.pizzas[0].opinions[0].pizza_image_id)}
				alt="food"
				className="h-14 w-14 rounded mr-2"
				/>
			</div>
			</div>
		</div>

	)
}