
import { useState, useEffect, useContext, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

import { NetworkContext } from "../context/NetworkContext";
import { PizzaInputContext } from "../context/PizzaInputContext";

import { priceSchema } from "../validations/schemas";

import PizzaImageNameVenue from "../components/PizzaImageNameVenue";
import Chart from "../components/Chart";

export default function Price() {

	const [price, setPrice] = useState(0)
	const [comment, setComment] = useState("")
	const [image, setImage] = useState('')

	const { input } = useContext(PizzaInputContext);
	const { getImage } = useContext(NetworkContext);

	let history = useHistory();
	
	const reducer = payload => {
		if (payload < 0) {
			return "Wait...they paid you to eat their pizza 🧐"
		} else if (payload === 0) {
			return "It's free! What?!"
		} else if (payload > 0 && payload < 15) {
			return "OK, that's a pretty cheap pizza"
		} else if (payload >= 15 && payload < 30) {
			return "This looks like an approapriate price for a pie"
		} else if (payload >= 30 && payload < 40) {
			return "Expensive...hopefully it was worth it"
		} else {
			return "Woah..."
		}
	}

	const data = useMemo(() => {
		return [
		{ value: input.cheesiness, emoji: "🧀", },
		{ value: input.flavor, emoji: "👅" },
		{ value: input.sauciness, emoji: "🍅" },
		{ value: input.saltiness, emoji: "🧂" },
		{ value: input.charness, emoji: "🔥" },
		{ value: input.spiciness, emoji: "🌶" },
	]}, [input])

	useEffect(() => {
		if (image === '') {
			getImage(input.imageId).then(res => {
				if (res.url) {
					setImage(res.url)
				}
			})
		}
	}, [input.imageId, getImage, image])

	useEffect(() => {
		setComment(reducer(price))
	}, [price])

	const onChange = e => {
		setPrice(Number(e.target.value))
	}

	const increase = e => {
		setPrice(Number(price) + 1)
	}

	const decrease = e => {
		setPrice(Number(price) - 1)
	}

	return (
		<div className="h-96 w-full flex flex-col justify-center items-center">
			<div className="flex items-center">
				<PizzaImageNameVenue input={input} image={image} className="flex"/>
				<Chart data={data} />
			</div>
			<label className="text-lg font-black py-2 text-yellow-500">
				How much was the pizza, roughly?
			</label>
			<div className="flex items-center">
			<button 
				id="decrease" 
				className="flex justify-center items-center py-2 my-2 bg-gray-200 px-4 mx-2 rounded-lg font-medium hover:bg-gray-300"
				onClick={e => decrease(e)}
			></button>
	        <label id="price" className="flex items-center bg-gray-100 text-gray-500 rounded-l h-10 px-4"></label>
	        <input
	        	className="bg-gray-100 rounded-r h-10 w-28 px-2 outline-none"
	            type="number"
	            name="price"
	            min="0"
	            max="100"
	            placeholder="5.00"
	            value={price}
	            onChange={e => onChange(e)}
	        />
	        <button 
	        	id="increase" 
	        	className="flex justify-center items-center py-2 my-2 bg-gray-200 px-4 mx-2 rounded-lg font-medium hover:bg-gray-300"
	        	onClick={e => increase(e)}
	        ></button>
        	</div>
        	<p className="text-xs font-light text-gray-600">{comment}</p>
        	<div className="absolute w-full bottom-1 md:right-0">
	        	<div className="flex md:justify-end justify-around">
					<Link 
						className="flex justify-center items-center py-2 my-2 bg-gray-200 px-16 md:px-4 md:mr-4 rounded-lg font-medium hover:bg-gray-300"
						to="/taste"
					>
						<i className="fas fa-chevron-left mr-2 text-xs"></i>back
					</Link>
				<button 
		            id="continue"
		            className="upload flex justify-center px-16 md:px-4 my-2 py-2 rounded-lg border-2 bg-red-600 border-red-700 md:self-end md:mr-8 font-bold"
		            onClick={() => {
		            	priceSchema.isValid({
		            		price: price,
		            	}).then(valid => {

		            		if (valid) {
		            			history.push("/conclusion")
		            		} else {
		            			Swal.fire("The Price!",
                                        "The price must be $0 between $500",
                                        "error"
                                )
		            		}
		            	})

		            }}
		            >
		                continue
		            </button>
		        </div>
	        </div>
        </div>
	)
}