import React, { useState } from "react";


export default function Slider ({ name, value, set }) {
	const [v, setV] = useState(value)

	const onChange = (e) => {
		e.preventDefault()
		setV(e.target.value)
		set(e.target.value)
	}

	return (
		<div className="flex flex-col">
			<label className="text-xs text-gray-500">{name}</label>
		    <input className="slider" type="range" name="sweet" value={v} min="0" max="5" step="0.1" onChange={e => onChange(e)} />
	    </div>
    );
};