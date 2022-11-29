import { useContext, useState, useEffect } from "react"
import { DateContext } from "../context/DateContext"

import { Link } from "react-router-dom"

import RightSideBar from "./RightSideBar"

const ContributionActivity = () => {

	const { hoveredDate, info, state } = useContext(DateContext)

	const [date, setDate] = useState("")

	useEffect(() => {
		setDate(hoveredDate)
	}, [info, hoveredDate])

	return (
		<div className="flex sm:flex-row flex-col w-full justify-around">
			<div className="flex-col">
				<h2>Contribution Activity</h2>
				<div className="w-full pb-4">
					<h3 className="border-bottom mb-3">
						<span className="pl-2 pr-3">{hoveredDate}</span>
					</h3>
					<p>{state}</p>
					<div className="flex-col">
						<p>Published: {date}</p>
						{info.length > 0 &&
							info.map((obj) => (
								<div key={obj.id} className="flex justify-center">
									<Link to={`/detail/${obj.pizza_id}`} >
										<div className="w-full">
											<div className="flex border-b my-1">
												<div className="w-52 flex">
													<img
													className="h-16 w-16 rounded aspect-ratio"
													src={`http://localhost:4000/v1/images/${obj.image_id}`}
													alt="food"
													/>
												</div>
												<div className="flex-col">
													<p className="text-gray-400 font-black flex pl-2">{obj.name}</p>
													<p className="bg-black text-white text-xs flex pl-2 w-48">{obj.style}</p>
													<div className="flex justify-between">
														<p className="text-gray-400 font-black flex pl-2">{obj.conclusion}</p>
														<p className="flex text-xs h-6 items-center">💵 {obj.price}</p>
													</div>
												</div>
											</div>
										</div>
									</Link>
								</div>
							))
						}
					</div>
				</div>
			</div>
			<RightSideBar />
		</div>
	)
}

export default ContributionActivity