import { useEffect, useReducer, createContext } from "react";
import useLocalStorage from "../useLocalStorage";

export const PizzaInputContext = createContext();

const initialState = {
	name: '',
	pizzaId: null,
	venueId: null,
	tasteId: null,
	imageId: null,
	location: {
		name: '',
		lat: null,
		lon: null,
		address: '',
	},
	style: '',
	details: '',
	taste: {
		cheesiness: 0,
		flavor: 0,
		sauciness: 0,
		saltiness: 0,
		charness: 0
	}
}

const ADD = "ADD";

const reducer = (state = initialState, action) => {
	if (action.type === ADD) {
		const { payload } = action
		const key = Object.keys(payload)[0]
		console.log(key)
		switch (key) {
			case "imageId":
				const { imageId } = payload
				return { ...state, imageId }
			case "name":
				const { name } = payload
				return { ...state, name }
			case "venueId":
				const { venueId } = payload
				return { ...state, venueId }
			case "tasteId":
				const { tasteId } = payload
				return { ...state, tasteId }
			case "location":
				const { location } = payload
				return { ...state, location }
			case "style":
				const { style } = payload
				return { ...state, style }
			case "details":
				const { details } = payload
				return { ...state, details }
			case "taste":
				const { taste } = payload
				return { ...state, taste }
			default:
				return { ...state, payload }
		}
	}
	return state;
}



export const PizzaInputProvider = ({ children }) => {
	const [storage, setStorage] = useLocalStorage("pizzainput", initialState)

	const [input, dispatch] = useReducer(reducer, storage);

	useEffect(() => {
		setStorage(input)
	}, [input, setStorage])

	const add = (object) => {
		dispatch({
			type: ADD,
			payload: object
		})
	}

	return (
		<PizzaInputContext.Provider value={{ input, add }}>
			{children}
		</PizzaInputContext.Provider>
	);
};