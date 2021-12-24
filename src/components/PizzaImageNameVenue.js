import React from "react";
import PizzaStyle from "./PizzaStyle";

export default function PizzaImageNameVenue({ input, image, className }) {
	return (
		<div className={className}>
			<img 
			src={image} 
			alt="food"
			className="lg:h-24 lg:w-24 h-16 w-16 rounded" />
			<div className="flex items-start mx-2">
				<div className="flex flex-col">
					<p className="lg:text-xl text-lg font-bold px-1">{input.name}</p>
					<PizzaStyle input={input} />
					<p className="font-medium text-gray-500 px-1">{input.location.name}</p>
				</div>
			</div>
		</div>
	)
}