import { createContext, useState } from "react"

export const DateContext = createContext()

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