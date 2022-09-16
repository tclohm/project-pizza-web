import React from "react";

export default function TableCell({ obj, select }) {
	return (
		<div 
			onClick={ () => select(obj) }
			className="pl-2 py-2 border-b hover:bg-gray-100 cursor-pointer bg-white" 
			>
			<div className="flex items-center">
			  <div className="px-2 text-xs">
			  <p className="font-black">{obj.venue_name}</p>
			  <p className="text-gray-500 font-semibold">{obj.venue_address}</p>
			  <p>{obj.pizzas.length} reviews</p>
			  </div>
			</div>
		</div>

	)
}