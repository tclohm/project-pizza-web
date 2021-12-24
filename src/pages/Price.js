import React, { useState } from "react"


export default function Price() {

	const [price, setPrice] = useState(0)

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
			<p>Woah, that's an expensive pizza</p>
			<label className="">
				Price?
			</label>
			<div className="flex items-center">
			<button 
				id="decrease" 
				className="flex justify-center items-center py-2 my-2 bg-gray-200 px-4 mx-2 rounded-lg font-medium hover:bg-gray-300"
				onClick={e => decrease(e)}
			></button>
	        <label id="price" className="flex items-center bg-gray-100 rounded h-10 px-4"></label>
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
        </div>
	)
}