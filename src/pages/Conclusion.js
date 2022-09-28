import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { PizzaInputContext } from "../context/PizzaInputContext";
import { NetworkContext } from "../context/NetworkContext";

const selection = [
	"I would recommend it", 
	"I approve", 
	"Meh...It was fine", 
	"I disapprove", 
	"Dissatisfied"
]

export default function Conclusion() {

	const { input, add } = useContext(PizzaInputContext);
	const { getImage } = useContext(NetworkContext);

	const [conclusion, setConclusion] = useState('')

	const select = e => {
		e.preventDefault();
		setConclusion(e.target.textContent)
		add({ style: e.target.textContent })
	}

	return( 
		<div>
			<label className="text-lg font-black py-2 text-yellow-500">
				How much was the pizza, roughly?
			</label>
			<div>
			{selection.map((obj, id) => (
				obj === conclusion ?
				<button
				key={id} 
				onClick={e => select(e)}
				className="border-red-500 bg-red-500 text-white border-2 my-4 mx-1 px-1 py-2 rounded-lg font-semibold">
					{obj}
				</button>
				:
				<button 
				key={id}
				onClick={e => select(e)}
				className="border-red-300 border-2 my-4 mx-1 px-1 py-2 rounded-lg font-semibold">
					{obj}
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