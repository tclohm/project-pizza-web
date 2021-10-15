import { useEffect, useReducer, createContext } from "react";
import useLocalStorage from "../useLocalStorage";

export const PizzaInputContext = createContext();

const initialState = {
	pizzaName: '',
	location: {
		venueName: '',
		lat: null,
		lon: null,
		address: '',
	},
	image: '',
	style: '',
	details: '',
	taste: {
		Sweet: 0,
		Sour: 0,
		Bitter: 0,
		Salty: 0,
		Umami: 0,
		Pungency: 0,
		Fattiness: 0,
	}
}

const ADD = "ADD";

const reducer = (state = initialState, action) => {
	if (action.type === ADD) {
		const { payload } = action
		const key = Object.keys(payload)[0]
		switch (key) {
			case "image":
				const { image } = payload
				console.log({...state, image})
				return { ...state, image }
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