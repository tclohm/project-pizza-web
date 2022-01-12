import React from "react";

const active = "font-semibold text-white py-1 w-32 ring-1 border ring-pink-700 bg-pink-500 rounded z-10";
const inactive = "font-semibold text-gray-900 py-1 w-32 ring-1 border ring-gray-900 bg-white rounded z-10";

export default function ToggleButton({ children, selected, setSelected }) {

	const toggle = e => {
		e.preventDefault()
		setSelected(e.target.name)
	}

	return (
		<>
		{
			selected === children ?
			<button
				onClick={e => toggle(e)} 
				type="radio"
				name={children}
				className={active}>
				{children}
			</button>
			:
			<button 
				onClick={e => toggle(e)}
				type="radio"
				name={children}
				className={inactive}>
				{children}
			</button>

		}
		</>
	) 
}