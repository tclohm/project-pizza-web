import { useEffect, useState } from "react"
import { useParams, Link, useHistory } from 'react-router-dom'

import Map from "../components/Map"

const Ingredient = ({ emoji, number }) => {
	return (
		<div className="flex-col rounded-xl mx-1 py-2">
			<span style={{ "fontSize": "1.5rem" }}>{emoji}</span>
			<p className="text-xs font-bold bg-yellow-400 h-6 w-6 rounded-full flex justify-center items-center">{number}</p>
		</div>
	)
}

const WatchAndStart = () => {
	return (
		<div className="fixed top-1 right-1">
			<button>
				<span className="z-10 bg-white rounded px-6 py-1 border"><i className="fa fa-eye"></i> Watch</span>
			</button>
			<button>
				<span className="z-10 bg-white rounded px-6 py-1 border"><i className="fa fa-star"></i> Star</span>
			</button>
		</div>
	)
}

const CalendarDetail = () => {
	const { pizzaId } = useParams()

	const navigate = useHistory()

	const [selected, setSelected] = useState({})
	const [location, setLocation] = useState({})
	const [other, setOther] = useState([])

	console.log(location)

	useEffect(() => {
		fetch(`http://localhost:4000/v1/venuepizzas/${pizzaId}`)
		.then(res => res.json())
		.then(data => setSelected(data))
	}, [pizzaId])

	useEffect(() => {
		if (selected && selected.venuepizza) {
			const id = selected.venuepizza.venue_id
			fetch(`http://localhost:4000/v1/venues/${id}`)
			.then(res => res.json())
			.then(data => setLocation(data.venue))
		}
	}, [selected])

	useEffect(() => {
		if (selected && selected.venuepizza) {
			const venueId = selected.venuepizza.venue_id
			fetch(`http://localhost:4000/v1/venuepizzas/${venueId}/pizzas`)
			.then(res => res.json())
			.then(data => setOther(data.venuepizzas.filter(obj => obj.pizza_id !== selected.venuepizza.pizza_id)))
		}
	}, [selected])

	return (
		<div className="w-screen px-3 py-1 my-8">
			<button onClick={() => navigate.goBack()}>
				<span className="fixed top-0 z-10 bg-white rounded-full px-3 py-2 border"><i className="fa fa-arrow-left"></i></span>
			</button>
			{selected && selected.venuepizza && location ?
					<div key={location.id}>
						<h1 className="text-2xl font-light ">{location.name}</h1>
						<Map location={location} />
						<p className="text-blue-500 bg-gray-200 px-1 text-xs md:text-sm">{location.address}</p>
						<div className="w-full rounded-2xl relative py-2">
							<div className="flex flex-row justify-between">
								<img
								className="h-48 w-48 rounded"
								src={`http://localhost:4000/v1/images/${selected.venuepizza.pizza_image_id}`}
								alt="food"/>

								<p className="text-gray-400 font-black flex pl-2 absolute md:text-7xl text-2xl right-0 top-0 z-1">{selected.venuepizza.conclusion}</p>
								<div className="flex justify-end items-center w-full">
									<Ingredient emoji="🔥" number={selected.venuepizza.charness} />
									<Ingredient emoji="🧀" number={selected.venuepizza.cheesiness} />
									<Ingredient emoji="👅" number={selected.venuepizza.flavor} />
									<Ingredient emoji="🧂" number={selected.venuepizza.saltiness} />
									<Ingredient emoji="🍅" number={selected.venuepizza.sauciness} />
									<Ingredient emoji="🌶" number={selected.venuepizza.spiciness} />
								</div>
							</div>
							<div className="flex-col">
								<p className="text-gray-400 font-black flex">{selected.venuepizza.pizza_name}</p>
								<p className="bg-black text-white text-xs flex pl-1">{selected.venuepizza.pizza_style}</p>
								<div className="flex justify-between">
									<p className="flex text-xs h-6 items-center">💵 {selected.venuepizza.price}</p>
									<p className="text-xs">{new Date(selected.venuepizza.created_at).toUTCString().slice(0,16)}</p>
								</div>
							</div>
						</div>
					</div>
		:
		<div key="ok">empty</div>
		}
		{other.length > 0 ? <p className="bg-gray-200 px-3">Other Reviews from {location.name}</p> : <p className="bg-gray-200 px-3">No Other Reviews for {location.name}</p>}
		<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 py-2">

			{other.length > 0 ? other.map(obj => (
				<Link to={`/detail/${obj.pizza_id}`} key={obj.pizza_id}>
					<div className="bg-gray-100 rounded-2xl lg:m-2 p-4 relative">
						<div className="flex flex-row justify-between">
							<img
							className="h-16 w-16 rounded"
							src={`http://localhost:4000/v1/images/${obj.pizza_image_id}`}
							alt="food"
							/>
							<p className="text-gray-400 font-black flex pl-2 absolute text-2xl right-4 top-0 z-1">{obj.conclusion}</p>
							<div className="flex justify-end items-center w-full">
								<Ingredient emoji="🔥" number={obj.charness} />
								<Ingredient emoji="🧀" number={obj.cheesiness} />
								<Ingredient emoji="👅" number={obj.flavor} />
								<Ingredient emoji="🧂" number={obj.saltiness} />
								<Ingredient emoji="🍅" number={obj.sauciness} />
								<Ingredient emoji="🌶" number={obj.spiciness} />
							</div>
						</div>
						<div className="flex-col">
							<p className="text-gray-400 font-black flex">{obj.pizza_name}</p>
							<p className="bg-black text-white text-xs flex pl-1">{obj.pizza_style}</p>
							<div className="flex justify-between">
								<p className="flex text-xs h-6 items-center">💵 {obj.price}</p>
								<p className="text-xs">{new Date(obj.created_at).toUTCString().slice(0,16)}</p>
							</div>
						</div>
					</div>
				</Link>
			))
			:
			<div className="flex justify-start">
				<span className="text-xl font-black text-gray-100">EMPTY</span>
			</div>
			}
		</div>
		</div>
	)
}

export default CalendarDetail