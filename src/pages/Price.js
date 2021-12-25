import React, { useState, useEffect } from "react"

export default function Price() {

	const [price, setPrice] = useState(0)
	const [comment, setComment] = useState("")

	const reducer = payload => {
		if (payload < 0) {
			return "Wait...they paid you to eat their pizza 🧐"
		} else if (payload === 0) {
			return "The bitterness of poor quality remains long after the sweetness of low price is forgotten - Ben Franklin\nWhy is it free?"
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

	useEffect(() => {
		setComment(reducer(price))
	}, [price])

	const onChange = e => {
		setPrice(e.target.value)
	}

	const increase = e => {
		setPrice(price + 1)
	}

	const decrease = e => {
		setPrice(price - 1)
	}

	return (
		<div className="h-96 flex flex-col justify-center items-center">
			
			<label className="text-lg font-black py-2 text-yellow-500">
				How much was the pizza?
			</label>
			<div className="flex items-center">
			<button 
				id="decrease" 
				className="flex justify-center items-center py-2 my-2 bg-gray-200 px-4 mx-2 rounded-lg font-medium hover:bg-gray-300"
				onClick={e => decrease(e)}
			></button>
	        <label id="price" className="flex items-center bg-gray-100 text-gray-500 rounded h-10 px-4"></label>
	        <input
	        	className="bg-gray-100 rounded h-10 w-28 outline-none"
	            type="text"
	            name="price"
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
        </div>
	)
}