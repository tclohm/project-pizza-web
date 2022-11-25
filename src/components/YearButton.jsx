import { useState } from 'react';

const YearButton = ({ year, active }) => {

	const [selected, setSelected] = useState(active)


	return (
		<>
		{ selected ?
			<button 
			onClick={e => setSelected(!selected)}
			className="rounded pl-4 pr-12 py-2 my-1 h-8 text-xs bg-red-500">{year}</button>
		:
			<button 
			onClick={e => setSelected(!selected)}
			className="rounded pl-4 pr-12 py-2 my-1 h-8 text-xs hover:bg-gray-200">{year}</button>
		}
		</>
	)
}

export default YearButton;