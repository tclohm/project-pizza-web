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
					<p className="lg:text-xl text-lg font-bold px-1">{input.name ? input.name : input.pizza_name}</p>
					<PizzaStyle input={input} />
					<p className="text-gray-300 font-black text-2xl">{input.conclusion}</p>
				</div>
			</div>
		</div>
	)
}