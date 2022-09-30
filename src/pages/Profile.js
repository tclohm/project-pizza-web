import { useState, useEffect, useContext } from "react";
import Detail from "./Detail";
import Map from "../components/Map";
import TableCell from "../components/TableCell";
import { NetworkContext } from "../context/NetworkContext";

export default function Profile() {

	const [data, setData] = useState([])

	const [collection, setCollection] = useState({})

	const [results, setResults] = useState([])

    const [input, setInput] = useState("");

	const [dataReceived, setDataReceived] = useState(false)

	const [selected, setSelected] = useState("")

	const { getVenuesPizza } = useContext(NetworkContext)


	const store = arrayOfFeature => {
		return {
		  "type": "FeatureCollection",
		  "features": arrayOfFeature
		}
	}

	useEffect(() => {
		if (dataReceived) { return }
	      		getVenuesPizza().then(res => {
	        	return res.json()
      		})
      		.then(data => {
	    		if (data && data.venuepizzas) {
	    			setData(data.venuepizzas)
	    			setSelected(data.venuepizzas[0])
	    			return data.venuepizzas.map(object => {
						return {
							"type": "Feature",
							"geometry": {
								"type": "Point",
								"coordinates": [
									object.lon,
									object.lat       
								]
							},
							"properties": {
								"id": `${object.venue_id}`,
								"price": `${object.pizzas[0].opinions[0].price}`
							}
						}
					})
	    		}
	    	})
	    	.then(data => {
	    		setCollection(store(data))
	    	})
	    setDataReceived(true)
	}, [getVenuesPizza, dataReceived])


	useEffect(() => {
    	const results = data.filter(obj => {
    		return obj.venue_name.toLowerCase().includes(input.toLowerCase())
    	})
    	setResults(results)
    }, [input, data])


	return (
		<div className="w-full md:flex absolute">

			<div className="left bg-white lg:w-5/12 w-full h-screen overflow-y-auto snap-y">
				<div className="sticky top-0 shadow flex flex-col bg-white">
					<p 
					className="w-full font-semibold text-white px-2 py-1 bg-pink-500 text-xs z-10">
					Reviewed
					</p>
					<input 
		              className="overflow-ellipsis overflow-hidden border focus:outline-none p-2 m-2 rounded hover:bg-yellow-100"
		              type="text" 
		              name="location"
		              onChange={e => setInput(e.target.value)} 
		              placeholder="Search..."/>
	            </div>
				<div className="overflow-y-auto snap-y">
					{
						input.length !== 0 ?
						results.map((obj, id) => (
							<TableCell obj={obj} key={id} select={setSelected} />
	            		))
						:
						data.map((obj, id) => (
							<TableCell obj={obj} key={id} select={setSelected} />
	            	))}
            		<p className="flex justify-center text-gray-400 text-xs">empty all the way down</p>
            	</div>
			</div>
			
			<div className="right md:w-full sticky left-0 bottom-0">
					{
					selected === ""
					?
						<p>empty</p>
					:
						<div className="bg-white md:relative flex flex-col">
							<Map lng={selected.lon} lat={selected.lat} collection={collection} />
							<div className="flex flex-col p-4 m-2 ring-1 ring-black rounded">
								<h4 className="font-semibold text-md">Address</h4>
								<p className="text-md">{selected.venue_address}</p>
								<p className="text-xs font-light">Last visited: {new Date(selected.pizzas[0].opinions[0].created_at).toDateString()}</p>
							</div>
							{
								selected.pizzas.map((pizza, i) => (
									<Detail key={i} pizza={pizza} opinions={pizza.opinions}/>
								))
							}
							
						</div>
					}
			</div>

		</div>

	)
}