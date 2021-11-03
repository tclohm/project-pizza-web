import React from "react";


export default function PizzaImageNameVenue({ input, image, className }) {
	return (
		<div className={className}>
			<img 
			src={image} 
			alt="food"
			className="lg:h-24 lg:w-24 h-16 w-16 rounded" />
			<div className="flex flex-col ml-2">
				<p className="lg:text-xl text-lg font-bold">{input.name}</p>
				<p className="font-medium text-gray-500">{input.location.name}</p>
			</div>
		</div>
	)
}