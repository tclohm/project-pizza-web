import { useEffect, useReducer, createContext } from "react";
import useLocalStorage from "../useLocalStorage";

export const PizzaInputContext = createContext();

const initialState = {
	pizzaName: '',
	imageId: '',
	location: {
		venueName: '',
		lat: null,
		lon: null,
		address: '',
	},
	style: '',
	details: '',
	tasteId: null,
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
				return {...state, imageId }
			case "pizzaName":
				const { pizzaName } = payload
				return { ...state, pizzaName }
			case "location":
				const { location } = payload
				return { ...state, location }
			case "style":
				const { style } = payload
				return { ...state, style }
			case "details":
				const { details } = payload
				return { ...state, details }
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