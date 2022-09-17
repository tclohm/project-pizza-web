import React from "react";


// MARK: -- change to objects and place definitions
const selection = {
	"Neopolitan": "Round, thin, fluffy, charred",
	"New York-style": "Round, thin, crispy on the outside but chewy on the inside",
	"Sicilian": "Rectangular, thick, puffy",
	"Grandma pizza": "Rectangular, thin",
	"Detroit-style": "Rectangular, thick",
	"New Haven-style": "Round, thin, crunchy",
	"California-style": "Round, typically thin. All about the produce on top",
	"Chicago deep-dish": "Round, thick. Oily, less protein, dense",
	"St. Louis-style": "Round, thin, cracker-like. Crunch when bitten",
	"Roman-style": "Rectangular, thick, puffy. Big and bubbly cross section",
	"Other": "NA",
}

export default function PizzaCategoryButtons({ set, selected, add }) {

	const select = e => {
		e.preventDefault();
		set(e.target.textContent)
		add({ style: e.target.textContent })
	}

	return (
		<div className="mx-6 text-xs">
			<p className="text-xs font-light mx-2">Features: {selected === "" ?
				"---"
			:
				selection[selected]
			}</p>
			{Object.keys(selection).map((obj, id) => (
				obj === selected ?
				<button
				key={id} 
				onClick={e => select(e)}
				className="border-red-500 bg-red-500 text-white border-2 my-4 mx-1 px-1 py-2 rounded-lg font-semibold">
					{obj}
				</button>
				:
				<button 
				key={id}
				onClick={e => select(e)}
				className="border-red-300 border-2 my-4 mx-1 px-1 py-2 rounded-lg font-semibold">
					{obj}
				</button>
			))}
		</div>
	);
};