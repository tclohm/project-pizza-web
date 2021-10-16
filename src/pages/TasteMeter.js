import React, { useState, useContext } from "react";

import { PizzaInputContext } from "../context/PizzaInputContext";

import Slider from "../components/Slider";

export default function TasteMeter () {

	const [cheeseSize, setCheeseSize] = useState(0)
	const [flavorSize, setFlavorSize] = useState(0)
	const [saucinessSize, setSaucinessSize] = useState(0)
	const [saltinessSize, setSaltinessSize] = useState(0)
	const [charSize, setCharSize] = useState(0)

	const { input, add } = useContext(PizzaInputContext);

	return (
		<div className="absolute min-h-90 w-full">
			<div className="flex w-full flex-col lg:flex-row">
				<div className="flex flex-col lg:w-full lg:h-full lg:flex-row-reverse lg:items-center">
					<div className="flex lg:flex-col h-48 lg:min-h-90 lg:w-1/2 justify-center items-center">
						<label
							 name="Cheesiness"
							 style={{ fontSize: `${cheeseSize}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
							 >🧀</label>
						<label
							 name="Flavor"
							 style={{ fontSize: `${flavorSize}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
							 >👅</label>
						<label
							 name="Sauciness"
							 style={{ fontSize: `${saucinessSize}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
							 >🍅</label>
						<label
							 name="Saltiness"
							 style={{ fontSize: `${saltinessSize}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
							 >🧂</label>
						<label
							 name="Char"
							 style={{ fontSize: `${charSize}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
						>🔥</label>
					</div>
					<div className="flex flex-col sm:mx-28 mx-12 lg:w-1/2 lg:justify-center">
						<label className="text-lg font-black py-2 text-yellow-500">Taste</label>
						<Slider name="Cheesiness" value={cheeseSize} set={setCheeseSize} />
						<Slider name="Flavor" value={flavorSize} set={setFlavorSize} />
						<Slider name="Sauciness" value={saucinessSize} set={setSaucinessSize} />
						<Slider name="Saltiness" value={saltinessSize} set={setSaltinessSize} />
						<Slider name="Char" value={charSize} set={setCharSize} />
					</div>
				</div>
			</div>
			<div className="absolute w-full flex justify-between bottom-2">
				<div>
					<p>pizza image</p>
					<p>{input.pizzaName}</p>
				</div>
				<button className="upload px-4 m-4 py-2 rounded-lg">submit</button>
			</div>
		</div>
	);
};