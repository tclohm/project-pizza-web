import { useReducer, useState, createContext } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
	const [location, setLocation] = useState('');

	return (
		<LocationContext.Provider value={{ location, setLocation }}>
			{children}
		</LocationContext.Provider>
	);
};