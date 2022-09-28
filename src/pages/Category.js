import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { PizzaInputContext } from "../context/PizzaInputContext";
import { NetworkContext } from "../context/NetworkContext";

import PizzaCategoryButtons from "../components/PizzaCategoryButtons";
import PizzaImageNameVenue from "../components/PizzaImageNameVenue";

const inputstyles = "overflow-ellipsis overflow-hidden focus:outline-none py-2 px-8 border-b text-sm inputfield"

export default function Category () {
	const [style, setStyle] = useState('');
    const [other, setOther] = useState('Other');
	const [image, setImage] = useState('');

    const { input, add } = useContext(PizzaInputContext);
	const { getImage } = useContext(NetworkContext);


    const history = useHistory();

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
		<div className="flex flex-col justify-center">
	
			<PizzaImageNameVenue input={input} image={image} className="flex flex-row items-end px-8"/>
			<label className="py-2 px-8 ext-lg font-black text-yellow-500">Category</label>
				<PizzaCategoryButtons set={setStyle} selected={style} add={add} />
				{style === "Other" ?
					<input 
						className={inputstyles} 
						type="text" 
						name="other"
						value={other} 
						onChange={e => { 
							setOther(e.target.value)
							add({ style: e.target.value })
						}}
						placeholder="What's this type of pizza"/>
				:
					<></>
				}
			<div className="absolute w-full bottom-1 md:right-0">
	        	<div className="flex md:justify-end justify-around">
					<Link 
						className="flex justify-center items-center py-2 my-2 bg-gray-200 px-16 md:px-4 md:mr-4 rounded-lg font-medium hover:bg-gray-300"
						to="/"
					>
						<i className="fas fa-chevron-left mr-2 text-xs"></i>back
					</Link>
					<button 
						id="continue"
						className="upload flex justify-center px-16 md:px-4 my-2 py-2 rounded-lg border-2 bg-red-600 border-red-700 md:self-end md:mr-8 font-bold"
						onClick={e => {
							history.push("/taste")
						}}
					>
						continue
					</button>
				</div>
			</div>
		</div>

	)
}