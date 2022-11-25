import { createContext, useState, useEffect } from "react"

export const DateContext = createContext()

const initialInfo = [
	{
		result: 'LOADING',
		reviews: [],
	}
]

const types = {
	LOADING: 'LOADING',
	SUCCESS: 'SUCCESS',
	FAILURE: 'FAILURE',
}

const reducer = (state, action) => {
	switch (action.type) {
		case types.LOADING:
			return { ...state, result: action.value }
		case types.SUCCESS:
			return { ...state, result: action.value }
		case types.FAILURE:
			return { ...state, result: action.value }
	}
}

export const DateProvider = ({ children }) => {

	const future = new Date()
    future.setHours(0)
    let past = new Date(future.getFullYear() - 1, future.getMonth(), future.getDate())

	const [hoveredDate, setHoveredDate] = useState(future.toUTCString().slice(0,16))
	const [info, setInfo] = useState([])
	const [state, setState] = useState("")
 	
	return (
		<DateContext.Provider value={{ future, past, hoveredDate, setHoveredDate, info, setInfo, state, setState}}>
			{children}
		</DateContext.Provider>
	)
}