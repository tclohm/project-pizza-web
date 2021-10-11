import React from "react";

const selection = [
"Neopolitan",
"New York-style",
"Sicilian",
"Grandma pizza",
"Detroit-style",
"New Haven-style",
"California-style",
"Chicago deep-dish",
"St. Louis-style",
"Roman-style",
"Other"
]

export default function PizzaCategoryButtons({ set, selected }) {

	const select = e => {
		e.preventDefault();
		set(e.target.textContent)
	}

	return (
		<div className="mx-6 text-xs">
			{selection.map((style, id) => (
				style === selected ?
				<button
				key={id} 
				onClick={e => select(e)}
				className="border-red-300 bg-red-300 text-white border-2 my-4 mx-1 px-1 py-2 rounded-lg font-semibold">
					{style}
				</button>
				:
				<button 
				key={id}
				onClick={e => select(e)}
				className="border-red-300 border-2 my-4 mx-1 px-1 py-2 rounded-lg font-semibold">
					{style}
				</button>
			))}
		</div>
	);
};