import React, { useState, useContext, useEffect } from "react";

import { PizzaInputContext } from "../context/PizzaInputContext";

import Slider from "../components/Slider";

export default function TasteMeter () {
	const [image, setImage] = useState('')
	const [taste, setTaste] = useState({

		cheesiness: 0,
		flavor: 0,
		sauciness: 0,
		saltiness: 0,
		charness: 0

	})

	const { input, add } = useContext(PizzaInputContext);

	useEffect(() => {
		fetch(`http://localhost:8000/image/${input.imageId}`)
		.then(res => {
			setImage(res.url)
		})
		.catch(err => console.error(err))
	}, [])

	return (
		<div className="absolute min-h-90 w-full">
			<div className="flex w-full flex-col lg:flex-row">
				<div className="flex flex-col lg:w-full lg:h-full lg:flex-row-reverse lg:items-center">
					<div className="flex lg:flex-col h-48 lg:min-h-90 lg:w-1/2 justify-center items-center">
						<label
							 name="Cheesiness"
							 style={{ fontSize: `${taste.cheesiness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
							 >🧀</label>
						<label
							 name="Flavor"
							 style={{ fontSize: `${taste.flavor}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
							 >👅</label>
						<label
							 name="Sauciness"
							 style={{ fontSize: `${taste.sauciness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
							 >🍅</label>
						<label
							 name="Saltiness"
							 style={{ fontSize: `${taste.saltiness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
							 >🧂</label>
						<label
							 name="Char"
							 style={{ fontSize: `${taste.charness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-around"
						>🔥</label>
					</div>
					<div className="flex flex-col sm:mx-28 mx-12 lg:w-1/2 lg:justify-center lg:mb-20">
						<label className="text-lg font-black py-2 text-yellow-500">Taste</label>
						<Slider name="Cheesiness" value={taste.cheesiness} set={setTaste} state={taste} />
						<Slider name="Flavor" value={taste.flavor} set={setTaste} state={taste} />
						<Slider name="Sauciness" value={taste.sauciness} set={setTaste} state={taste} />
						<Slider name="Saltiness" value={taste.saltiness} set={setTaste} state={taste} />
						<Slider name="Charness" value={taste.charness} set={setTaste} state={taste} />
					</div>
				</div>
			</div>
			<div className="absolute w-full flex justify-between bottom-2">
				<div className="flex ml-2 mb-2">
					<img 
					src={image} 
					alt="food"
					className="lg:h-20 lg:w-20 h-16 w-16 rounded" />
					<div className="flex flex-col ml-2">
						<p className="text-lg font-bold">{input.name}</p>
						<p className="text-gray-600">{input.location.name}</p>
					</div>
				</div>
				<button className="upload px-4 m-4 py-2 rounded-lg">submit</button>
			</div>
		</div>
	);
};