import React, { useState } from "react";


export default function Slider ({ name, value }) {
	const [v, setV] = useState(value)

	const onChange = (e) => {
		e.preventDefault()
		setV(e.target.value)
	}

	return (
		<>
			<label className="text-xs text-gray-500">{name}</label>
		    <input className="slider" type="range" name="sweet" value={v} min="0" max="10" step="1" onChange={e => onChange(e)} />
	    </>
    );
};