import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { PizzaInputContext } from "../context/PizzaInputContext";
import { NetworkContext } from "../context/NetworkContext";

import PizzaImageNameVenue from "../components/PizzaImageNameVenue";
import Slider from "../components/Slider";

export default function TasteMeter () {
	const { input, add } = useContext(PizzaInputContext);
	const { getImage } = useContext(NetworkContext);
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

	return (
		<div className="absolute flex flex-col justify-around min-h-90 w-full">
			<div className="relative flex lg:flex-row flex-col-reverse w-full">
				<div className="flex flex-col justify-center w-full lg:mx-20 px-4">
					<PizzaImageNameVenue input={input} image={image} className="lg:flex flex-row items-end hidden"/>
					<div className="flex flex-col lg:justify-center">
							<label className="text-lg font-black py-2 text-yellow-500">Taste</label>
							<Slider name="Cheesiness" value={input.cheesiness} add={add} />
							<Slider name="Flavor" value={input.flavor} add={add} />
							<Slider name="Sauciness" value={input.sauciness} add={add} />
							<Slider name="Saltiness" value={input.saltiness} add={add} />
							<Slider name="Charness" value={input.charness} add={add} />
					</div>
				</div>
				<div className="flex flex-col w-full lg:h-full lg:items-center">
					<PizzaImageNameVenue input={input} image={image} className="lg:hidden flex flex-row items-end p-4"/>
					<div className="flex lg:flex-col w-full lg:w-1/2 justify-center items-center overflow-hidden">
						<label
							 name="Cheesiness"
							 style={{ fontSize: `${input.cheesiness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-center"
							>🧀</label>
						<label
							 name="Flavor"
							 style={{ fontSize: `${input.flavor}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-center"
							>👅</label>
						<label
							 name="Sauciness"
							 style={{ fontSize: `${input.sauciness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-center"
							>🍅</label>
						<label
							 name="Saltiness"
							 style={{ fontSize: `${input.saltiness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-center"
							>🧂</label>
						<label
							 name="Char"
							 style={{ fontSize: `${input.charness}rem` }}
							 className="h-8 w-8 m-6 lg:m-8 flex items-center justify-center"
							>🔥</label>
					</div>
				</div>
			</div>
			<div className="flex md:justify-end justify-around">
				<Link 
					className="flex justify-center items-center py-2 my-2 bg-gray-200 px-16 md:px-4 md:mr-4 rounded-lg font-medium hover:bg-gray-300"
					to="/"
				>
					<i className="fas fa-chevron-left mr-2 text-xs"></i>back
				</Link>
			<Link 
	            id="continue"
	            className="upload flex justify-center px-16 md:px-4 my-2 py-2 rounded-lg border-2 bg-red-600 border-red-700 md:self-end md:mr-8 font-bold"
	            to="/price"
	            >
	                continue
	            </Link>
	        </div>
		</div>
	);
};