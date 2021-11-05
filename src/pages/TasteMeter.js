import React, { useState, useContext, useEffect } from "react";

import { PizzaInputContext } from "../context/PizzaInputContext";
import { NetworkContext } from "../context/NetworkContext";

import PizzaImageNameVenue from "../components/PizzaImageNameVenue";
import Slider from "../components/Slider";

export default function TasteMeter () {
	const { input, add } = useContext(PizzaInputContext);
	const { getImage, postTaste, postPizza, postVenuePizza } = useContext(NetworkContext);
	const [image, setImage] = useState('')

	useEffect(() => {
		if (image === '') {
			getImage(input.imageId).then(res => {
				if (res.url) {
					setImage(res.url)
				}
			})
		}
	}, [input.imageId, getImage, image])

	const all = e => {
		e.preventDefault()
		
		postTaste(input.taste).then(id => {
			postPizza({ 
				name: input.name, 
				style: input.style, 
				description: input.description, 
				tasteId: id,
				imageId: input.imageId 
			}).then(pizzaId => {
				postVenuePizza(input.venueId, pizzaId)
			})
		})
	}

	return (
		<div className="absolute flex flex-col justify-around min-h-90 w-full">
			<div className="relative flex lg:flex-row flex-col-reverse w-full">
				<div className="flex flex-col justify-center w-full lg:mx-20 px-4">
					<PizzaImageNameVenue input={input} image={image} className="lg:flex flex-row items-end hidden"/>
					<div className="flex flex-col lg:justify-center">
							<label className="text-lg font-black py-2 text-yellow-500">Taste</label>
							<Slider name="Cheesiness" value={input.taste.cheesiness} state={input.taste} add={add} />
							<Slider name="Flavor" value={input.taste.flavor} state={input.taste} add={add} />
							<Slider name="Sauciness" value={input.taste.sauciness} state={input.taste} add={add} />
							<Slider name="Saltiness" value={input.taste.saltiness} state={input.taste} add={add} />
							<Slider name="Charness" value={input.taste.charness} state={input.taste} add={add} />
					</div>
				</div>
				<div className="flex flex-col w-full lg:h-full lg:items-center">
					<PizzaImageNameVenue input={input} image={image} className="lg:hidden flex flex-row items-end p-4"/>
					<div className="flex lg:flex-col w-full lg:w-1/2 justify-center items-center overflow-hidden">
						<label
							 name="Cheesiness"
							 style={{ fontSize: `${input.taste.cheesiness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-center"
							>🧀</label>
						<label
							 name="Flavor"
							 style={{ fontSize: `${input.taste.flavor}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-center"
							>👅</label>
						<label
							 name="Sauciness"
							 style={{ fontSize: `${input.taste.sauciness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-center"
							>🍅</label>
						<label
							 name="Saltiness"
							 style={{ fontSize: `${input.taste.saltiness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-center"
							>🧂</label>
						<label
							 name="Char"
							 style={{ fontSize: `${input.taste.charness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-center"
							>🔥</label>
					</div>
				</div>
			</div>
			<button className="upload bg-red-600 mx-4 my-4 py-2 lg:w-20 lg:self-end rounded"
			onClick={e => all(e)}>submit</button>
		</div>
	);
};