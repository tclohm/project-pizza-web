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
]

export default function PizzaCategoryButtons() {
	return (
		<div className="mx-6 text-xs">
			{selection.map(style => (
				<button className="border-red-200 border-2 my-4 mx-1 px-1 py-2 rounded-lg font-semibold">{style}</button>
			))}
		</div>
	);
};