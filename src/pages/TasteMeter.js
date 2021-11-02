import React, { useState, useContext, useEffect } from "react";

import { PizzaInputContext } from "../context/PizzaInputContext";

import Slider from "../components/Slider";

export default function TasteMeter () {
	const { input, add } = useContext(PizzaInputContext);
	const [image, setImage] = useState('')

	useEffect(() => {
		fetch(`http://localhost:8000/image/${input.imageId}`)
		.then(res => {
			setImage(res.url)
		})
		.catch(err => console.error(err))
	}, [input.imageId])

	return (
		<div className="absolute min-h-90 w-full">
			<div className="flex w-full flex-col lg:flex-row">
				<div className="flex flex-col lg:w-full lg:h-full lg:flex-row-reverse lg:items-center">
					<div className="flex lg:flex-col h-48 lg:min-h-85 lg:w-1/2 justify-center items-center">
						<label
							 name="Cheesiness"
							 style={{ fontSize: `${input.taste.cheesiness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
							 >🧀</label>
						<label
							 name="Flavor"
							 style={{ fontSize: `${input.taste.flavor}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
							 >👅</label>
						<label
							 name="Sauciness"
							 style={{ fontSize: `${input.taste.sauciness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
							 >🍅</label>
						<label
							 name="Saltiness"
							 style={{ fontSize: `${input.taste.saltiness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
							 >🧂</label>
						<label
							 name="Char"
							 style={{ fontSize: `${input.taste.charness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
						>🔥</label>
					</div>
					<div className="flex flex-col sm:mx-28 mx-12 lg:w-1/2 lg:justify-center lg:mb-20">
						<label className="text-lg font-black py-2 text-yellow-500">Taste</label>
						<Slider name="Cheesiness" value={input.taste.cheesiness} state={input.taste} add={add} />
						<Slider name="Flavor" value={input.taste.flavor} state={input.taste} add={add} />
						<Slider name="Sauciness" value={input.taste.sauciness} state={input.taste} add={add} />
						<Slider name="Saltiness" value={input.taste.saltiness} state={input.taste} add={add} />
						<Slider name="Charness" value={input.taste.charness} state={input.taste} add={add} />
					</div>
				</div>
			</div>
			<div className="absolute w-full flex justify-between items-end bottom-2 border-solid border-t">
				<div className="flex ml-2 items-end mt-1">
					<img 
					src={image} 
					alt="food"
					className="h-16 w-16 rounded" />
					<div className="flex flex-col ml-2">
						<p className="text-lg font-bold">{input.name}</p>
						<p className="text-gray-600">{input.location.name}</p>
					</div>
				</div>
				<button className="upload h-12 w-24 mx-4 rounded-lg border-2 bg-red-600 border-red-700">submit</button>
			</div>
		</div>
	);
};