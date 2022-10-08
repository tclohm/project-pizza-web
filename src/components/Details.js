import { useState } from 'react';

export default function Details({ selected }) {

	const [taste, setTaste] = useState({});

	const url = (image_id) => {
		return 'http://localhost:4000/v1/images/' + image_id
	}

	return (
		<div className="flex flex-col">
				<div className="flex justify-center">
				<div className="flex flex-col items-center">
					<label
					 name="Cheesiness"
					 style={{ fontSize: '3rem' }}
					 className="flex justify-center h-18"
					>🧀</label>
					<p className="relative bottom-6 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{taste.cheesiness ? taste.cheesiness : 0}</p>
				</div>
				<div className="flex flex-col items-center">
					<label
					 name="Flavor"
					 style={{ fontSize: '3rem' }}
					 className="flex justify-center h-18"
					>👅</label>
					<p className="relative bottom-6 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{taste.flavor ? taste.flavor : 0}</p>
				</div>
				<div className="flex flex-col items-center">
					<label
					 name="Sauciness"
					 style={{ fontSize: '3rem' }}
					 className="flex justify-center h-18"
					>🍅</label>
					<p className="relative bottom-6 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{taste.sauciness ? taste.sauciness : 0}</p>
				</div>
				<div className="flex flex-col items-center">
					<label
					 name="Saltiness"
					 style={{ fontSize: '3rem' }}
					 className="flex justify-center h-18"
					>🧂</label>
					<p className="relative bottom-6 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{taste.saltiness ? taste.saltiness : 0}</p>
				</div>
				<div className="flex flex-col items-center">
					<label
					 name="Char"
					 style={{ fontSize: '3rem' }}
					 className="flex justify-center h-18"
					>🔥</label>
					<p className="relative bottom-6 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{taste.charness ? taste.charness : 0}</p>
				</div>
				<div className="flex flex-col items-center">
					<label
					 name="spiciness"
					 style={{ fontSize: '3rem' }}
					 className="flex justify-center h-18"
					>🌶</label>
					<p className="relative bottom-6 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{taste.spiciness ? taste.spiciness : 0}</p>
				</div>
				</div>
			<div className="w-full h-16 bg-white flex flex-row items-center">
			{selected.map(p => (
				p.opinions.map((o, i) => (
					<img
					key={i}
					src={url(o.pizza_image_id)}
					alt="food"
					className="h-14 w-14 rounded mr-2 cursor-pointer"
					onMouseEnter={() => {
						setTaste(o)
					}}
					onMouseLeave={() => {
						setTaste({})
					}}
					/>
			))))}
			</div>
			<p className="text-xs font-black">You're reviews ⬆️</p>
		</div>
	)
}