import React, { useState } from "react";
import Slider from "../components/Slider";

export default function TasteMeter () {

	const [cheeseSize, setCheeseSize] = useState(0)
	const [flavorSize, setFlavorSize] = useState(0)
	const [saucinessSize, setSaucinessSize] = useState(0)
	const [saltinessSize, setSaltinessSize] = useState(0)
	const [charSize, setCharSize] = useState(0)

	return (
		<div className="flex w-full md:flex-row flex-col md:justify-around justify-start">
			<div className="flex flex-col mx-8 md:mx-0">
			<label className="text-xs font-black text-yellow-500">Taste</label>
			<div>
				<label
				 name="Cheesiness"
				 style={{ fontSize: `${cheeseSize}rem` }}
				 >🧀</label>
				<Slider name="Cheesiness" value={cheeseSize} set={setCheeseSize} />
			</div>
			<div>
				<label
				 name="Flavor"
				 style={{ fontSize: `${flavorSize}rem` }}
				 >👅</label>
				<Slider name="Flavor" value={flavorSize} set={setFlavorSize} />
			</div>
			<div>
				<label
				 name="Sauciness"
				 style={{ fontSize: `${saucinessSize}rem` }}
				 >🍅</label>
				<Slider name="Sauciness" value={saucinessSize} set={setSaucinessSize} />
			</div>
			<div>
				<label
				 name="Saltiness"
				 style={{ fontSize: `${saltinessSize}rem` }}
				 >🧂</label>
				<Slider name="Saltiness" value={saltinessSize} set={setSaltinessSize} />
			</div>
			<div>
				<label
				 name="Char"
				 style={{ fontSize: `${charSize}rem` }}
				 >🔥</label>
				<Slider name="Char" value={charSize} set={setCharSize} />
			</div>
			</div>
		</div>
	);
};