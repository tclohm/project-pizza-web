import React from "react";


export default function PizzaStyle({ input }) {
	return (
		<p className="flex items-center bg-black text-white font-semibold text-xs bg-opacity-80 px-1">
		{input.style}
		</p>
	)
}