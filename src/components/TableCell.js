import React from "react";

const url = 'http://localhost:4000/v1/images/';

export default function TableCell({ obj, id, select }) {
	return (
		<div 
			onClick={ () => select(obj) }
			className="pl-2 py-2 border-b hover:bg-gray-100 cursor-pointer bg-white" 
			key={id}>
			<div className="flex items-center">
			  <img className="h-12 w-12 rounded-full" src={url + `${obj.pizza_image_id}`} alt="pizza" />
			  <div className="px-2 text-xs">
			  <p className="font-extralight">{obj.pizza_name}</p>
			  <p className="font-black">{obj.venue_name}</p>
			  <p className="text-gray-500 font-semibold">{new Date(obj.created_at).toDateString()}</p>
			  </div>
			</div>
		</div>

	)
}