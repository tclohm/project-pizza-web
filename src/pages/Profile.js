import React, { useState, useEffect, useContext } from "react";
import Detail from "./Detail";
import TableCell from "../components/TableCell";
import { NetworkContext } from "../context/NetworkContext";

export default function Profile() {

	const [data, setData] = useState([])

	const [results, setResults] = useState([])

    const [input, setInput] = useState("");

	const [dataReceived, setDataReceived] = useState(false)

	const [selected, setSelected] = useState({})

	const { getVenuesPizza } = useContext(NetworkContext)

	useEffect(() => {
		if (dataReceived) { return }
	      		getVenuesPizza().then(res => {
	        	return res.json()
      		}).then(data => {
	    		if (data && data.venuepizzas) {
	    			setData(data.venuepizzas)
	    			setDataReceived(true)
    		}
    	})
	}, [getVenuesPizza, dataReceived])


	useEffect(() => {
    	const results = data.filter(obj => {
    		return obj.pizza_name.toLowerCase().includes(input.toLowerCase()) || obj.venue_name.toLowerCase().includes(input.toLowerCase())
    	})
    	setResults(results)
    }, [input, data])


	return (
		<div className="flex w-full">

			<div className="left bg-gray-200 lg:w-1/4 w-full h-screen">
				<p 
				className="flex justify-start w-full font-semibold text-white px-2 py-1 bg-pink-500 text-xs z-10">
				Reviewed
				</p>
				<input 
	              className="flex overflow-ellipsis overflow-hidden ring-4 ring-gray-200 ring-inset focus:outline-none py-2 px-8 w-full rounded-lg"
	              type="text" 
	              name="location"
	              onChange={e => setInput(e.target.value)} 
	              placeholder="Search..."/>
				<div className="overflow-y-auto snap-y">
					{
						input.length !== 0 ?
						results.map((obj, id) => (
							<TableCell obj={obj} id={id} select={setSelected} />
	            		))
						:
						data.map((obj, id) => (
							<TableCell obj={obj} id={id} select={setSelected} />
	            	))}
            		<p className="flex justify-center text-gray-400 text-xs">empty all the way down</p>
            	</div>
			</div>
			
			<div className="right">

				<div className="flex justify-center">

					<Detail selected={selected}/>
					
				</div>

			</div>

		</div>

	)
}