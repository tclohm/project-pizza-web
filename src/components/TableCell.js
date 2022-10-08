import { useRef } from "react";
export default function TableCell({ obj, select }) {

	const el = useRef(null);

	return (
		<div
			title={`${obj.venue_name}-${obj.venue_id}`}
			onClick={ () => select(obj) }
			onMouseEnter={() => { 
				select(obj)
				const point = document.getElementById(`${obj.venue_name}-${obj.venue_id}`)
				if (point !== null || point !== undefined) {
					el.current = point
					el.current.classList.add(['active'])
				}
			}}
			onMouseLeave={() => {
				if (el !== null || el !== undefined) {
					el.current.classList.remove(['active'])
				}
			}}
			className="flex flex-row pl-2 py-2 border-b hover:bg-gray-100 cursor-pointer bg-white" 
			>
			<div className="w-full flex justify-between items-center">
				<div className="px-2 text-xs">
					<p className="font-black">{obj.venue_name}</p>
					<p className="text-gray-500 font-semibold">{obj.venue_address}</p>
					<p>{obj.pizzas.length} {obj.pizzas.length > 1 ? "pizzas" : "pizza"} reviewed</p>
				</div>
			</div>
		</div>

	)
}