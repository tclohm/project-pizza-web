import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import PizzaImageNameVenue from "../components/PizzaImageNameVenue";

import { PizzaInputContext } from "../context/PizzaInputContext";
import { NetworkContext } from "../context/NetworkContext";

const selection = {
	"RECOMMENDED": "I would recommend it", 
	"SATISFIED": "I approve", 
	"CONTENT": "Meh...It was fine", 
	"DISSATISFIED": "I disapprove", 
	"STAY AWAY": "I'm not going back",
}

export default function Conclusion() {

	const [image, setImage] = useState('')

	const { input, add } = useContext(PizzaInputContext);
	const { getImage } = useContext(NetworkContext);

	const [conclusion, setConclusion] = useState('')

	const select = e => {
		e.preventDefault();
		setConclusion(e.target.value)
		add({ conclusion: e.target.value })
	}

	useEffect(() => {
		if (image === '') {
			getImage(input.imageId).then(res => {
				if (res.url) {
					setImage(res.url)
				}
			})
		}
	}, [input.imageId, getImage, image])

	return( 
		<div className="flex flex-col w-full h-96 justify-center items-center p-2">
			<PizzaImageNameVenue input={input} image={image} className="flex self-start px-8" />
			<label className="text-lg font-black py-2 text-yellow-500 self-start px-8">
				How was the pizza?
			</label>
			<div>
			{Object.entries(selection).map((obj, id) => (
				obj[0] === conclusion ?
				<button
				key={id} 
				onClick={e => select(e)}
				value={obj[0]}
				className="border-red-500 bg-red-500 text-white border-2 my-4 mx-1 px-1 py-2 rounded-lg font-semibold">
					{obj[1]}
				</button>
				:
				<button 
				key={id}
				onClick={e => select(e)}
				value={obj[0]}
				className="border-red-300 border-2 my-4 mx-1 px-1 py-2 rounded-lg font-semibold">
					{obj[1]}
				</button>
			))}
			</div>
			<div className="absolute w-full bottom-0 md:right-0">
		    	<div className="flex md:justify-end justify-around">
					<Link 
						className="flex justify-center items-center py-2 my-2 bg-gray-200 px-16 md:px-4 md:mr-4 rounded-lg font-medium hover:bg-gray-300"
						to="/taste">
						<i className="fas fa-chevron-left mr-2 text-xs"></i>back
					</Link>
				<button 
		            id="submit"
		            className="upload flex justify-center px-16 md:px-4 my-2 py-2 rounded-lg border-2 bg-red-600 border-red-700 md:self-end md:mr-8 font-bold"
		            onClick={() => console.log("ok")}>
		                submit
		            </button>
		        </div>
		    </div>
		</div>
	)
}