import { useEffect, useReducer, createContext } from "react";
import useLocalStorage from "../useLocalStorage";

export const PizzaInputContext = createContext();

const initialState = {
	name: '',
	pizzaId: null,
	venueId: null,
	imageId: null,
	location: {
		name: '',
		lat: null,
		lon: null,
		address: '',
	},
	style: '',
	price: 0,
	description: '',
	cheesiness: 0,
	flavor: 0,
	sauciness: 0,
	saltiness: 0,
	charness: 0
	
}

const ADD = "ADD";
const CLEAR = "CLEAR";

const reducer = (state = initialState, action) => {
	if (action.type === ADD) {
		const { payload } = action
		const key = Object.keys(payload)[0]
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
			case "price":
				const { price } = payload
				return { ...state, price }
			case "description":
				const { description } = payload
				return { ...state, description }
			case "cheesiness":
				const { cheesiness } = payload
				return { ...state, cheesiness }
			case "flavor":
				const { flavor } = payload
				return { ...state, flavor }
			case "sauciness":
				const { sauciness } = payload
				return { ...state, sauciness }
			case "saltiness":
				const { saltiness } = payload
				return { ...state, saltiness }
			case "charness":
				const { charness } = payload
				return { ...state, charness }
			default:
				return { ...state, payload }
		}
	}
	if (action.type === CLEAR) {
		return initialState
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

	const clear = () => {
		dispatch({
			type: CLEAR,
			payload: {}
		})
	}

	return (
		<PizzaInputContext.Provider value={{ input, add, clear }}>
			{children}
		</PizzaInputContext.Provider>
	);
};