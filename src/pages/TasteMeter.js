import React from "react";
import Slider from "../components/Slider";

export default function TasteMeter () {
	return (
		<div className="flex w-full md:flex-row flex-col md:justify-around justify-start">
			<div className="flex flex-col mx-8 md:mx-0">
			<label className="text-xs font-black text-yellow-500">Taste</label>
			<Slider name="Sweet" value="0" />
			<Slider name="Sour" value="10" />
			<Slider name="Bitter" value="0" />
			<Slider name="Salty" value="0" />
			<Slider name="Umami" value="0" />
			</div>
			<div className="flex flex-col mx-8 md:mx-0">
			<label className="text-xs font-black text-yellow-500">Optional</label>
			<Slider name="Pungency" value="10" />
			<Slider name="Fattiness" value="0" />
			</div>
		</div>
	);
};