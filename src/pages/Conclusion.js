import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

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

	const { input, add, clear } = useContext(PizzaInputContext);
	const { getImage, postReview, postPizza, postVenuePizza } = useContext(NetworkContext);

	const [conclusion, setConclusion] = useState('')

	const history = useHistory()

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

	const all = async () => {

		await postReview(
			{
				style: input.style,
				price: input.price,
				image_id: input.imageId,
				cheesiness: input.cheesiness,
				flavor: input.flavor,
				sauciness: input.sauciness,
				saltiness: input.saltiness,
				charness: input.charness,
				spiciness: input.spiciness,
				conclusion: input.conclusion,
			}
		).then(id => {
			if (id) {
				postPizza({ name: input.name, review_id: id })
				.then(id => {
					if (id) {
						postVenuePizza({ venue_id: input.venueId, pizza_id: id })
					} else {
						Swal.fire(
							"Error with the network!",
			                "Something went wrong posting",
			                "error"
			                )
					}
				}).catch(err => console.log(err))
			} else {
				Swal.fire(
					"Error with the network!",
			        "Something went wrong posting the pizza",
			        "error"
			    )
			}
		}).then(() => {
			clear()
		}).then(() => {
			history.push("/")
		}).catch(err => console.log(err))

	}

	return( 
		<div className="flex flex-col w-full h-96 justify-center items-center p-2 md:px-8 mt-8">
			<PizzaImageNameVenue input={input} image={image} className="flex self-start mt-8 md:mt-0" />
			<label className="text-lg font-black py-2 text-yellow-500 self-start">
				How was the pizza?
			</label>
			<div className="flex md:flex-row flex-col">
			{Object.entries(selection).map((obj, id) => (
				obj[0] === conclusion ?
				<button
				key={id} 
				onClick={e => select(e)}
				value={obj[0]}
				className="border-red-500 bg-red-500 text-white border-2 md:my-4 my-2 mx-1 px-28 md:px-2 py-2 rounded-lg font-semibold">
					{obj[1]}
				</button>
				:
				<button 
				key={id}
				onClick={e => select(e)}
				value={obj[0]}
				className="border-red-300 border-2 md:my-4 my-2 mx-1 px-28 md:px-2 py-2 rounded-lg font-semibold">
					{obj[1]}
				</button>
			))}
			</div>
			<div className="absolute w-full bottom-1 md:right-0">
		    	<div className="flex md:justify-end justify-around">
					<Link 
						className="flex justify-center items-center py-2 my-2 bg-gray-200 px-16 md:px-4 md:mr-4 rounded-lg font-medium hover:bg-gray-300"
						to="/price">
						<i className="fas fa-chevron-left mr-2 text-xs"></i>back
					</Link>
				<button 
		            id="submit"
		            className="upload flex justify-center px-16 md:px-4 my-2 py-2 rounded-lg border-2 bg-red-600 border-red-700 md:self-end md:mr-8 font-bold"
		            onClick={() => all()}>
		                submit
		            </button>
		        </div>
		    </div>
		</div>
	)
}