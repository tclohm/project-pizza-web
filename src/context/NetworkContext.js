import { createContext, useContext } from "react";
import { PizzaInputContext } from "./PizzaInputContext";
// const POST_IMAGE = 'POST_IMAGE';

// const POST_LOCATION = 'POST_LOCATION';
// const UPDATE_LOCATION = 'UPDATE_LOCATION';

// const POST_TASTE = 'POST_TASTE';
// const UPDATE_TASTE = 'UPDATE_TASTE';

// const POST_PIZZA = 'POST_PIZZA'

export const NetworkContext = createContext();

const url = "http://localhost:4000/v1"

export const NetworkProvider = ({ children }) => {

	const { add } = useContext(PizzaInputContext);

	const upload = file => {
        const data = new FormData();
        data.append('file', file)
        fetch(`${url}/images`, { 
            method: 'POST',
            headers: {},
            body: data
        })
        .then(res => res.json())
        .then(data => { 
        	if (data.id) {
        		add({ imageId: data.id })
        	}
        })
        .catch(err => console.error(err))
        
    }

    const getImage = async imageId => {
        const res = await fetch(`${url}/${imageId}`)
        return res
    }

    const postVenue = venue => { 
    	fetch(`${url}/venue`, { 
            method: 'POST',
            headers: {},
            body: JSON.stringify(venue)
        })
        .then(res => res.json())
        .then(data => {
            if (data.id) {
                add({ venueId: data.id })
            }
        })
        .catch(err => console.error(err))
    }

    const updateVenue = async (venue, id) => {
    	await fetch(`${url}/venue/${id}`, { 
            method: 'PATCH',
            headers: {},
            body: venue
        })
        .then(res => res.json())
        .catch(err => console.error(err))
    }

    const postPizza = async pizza => {
        const res = await fetch(`${url}/pizzas`, {
            method: 'POST',
            headers: {},
            body: JSON.stringify(pizza)
        })
        .then(res => res.json())
        .then(data => {
            if (data.id) {
                return data.id
            }
        })
        return res
    }

	const updatePizza = (pizza, id) => {
		fetch(`${url}/pizzas/${id}`, { 
            method: 'PUT',
            headers: {},
            body: pizza
        })
        .then(res => res.json())
        .catch(err => console.error(err))
	}

    const postVenuePizza = venuepizza => {
        return fetch(`${url}/venuepizza`, {
            method: 'POST',
            headers: {},
            body: JSON.stringify(venuepizza)
        })
        .then(res => res.json())
        .catch(err => console.error(err))
    }

	return (
		<NetworkContext.Provider value={{  
			upload,
			getImage,
			postVenue,
			updateVenue,
            postPizza,
            updatePizza,
            postVenuePizza
		}}>
			{children}
		</NetworkContext.Provider>
	);
}