import { createContext, useContext } from "react";
import { PizzaInputContext } from "./PizzaInputContext";
// const POST_IMAGE = 'POST_IMAGE';

// const POST_LOCATION = 'POST_LOCATION';
// const UPDATE_LOCATION = 'UPDATE_LOCATION';

// const POST_TASTE = 'POST_TASTE';
// const UPDATE_TASTE = 'UPDATE_TASTE';

// const POST_PIZZA = 'POST_PIZZA'

export const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {

	const { add } = useContext(PizzaInputContext);

	const upload = file => {
        const data = new FormData();
        data.append('file', file)
        fetch("http://localhost:8000/upload/image", { 
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
        const res = await fetch(`http://localhost:8000/image/${imageId}`)
        return res
    }

    const postVenue = venue => { 
    	fetch("http://localhost:8000/post/venue", { 
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
    	await fetch(`http://localhost:8000/put/venue/${id}`, { 
            method: 'PUT',
            headers: {},
            body: venue
        })
        .then(res => res.json())
        .catch(err => console.error(err))
    }

    const postPizza = (pizza) => {
        fetch("http://localhost:8000/post/pizza", {
            method: 'POST',
            headers: {},
            body: JSON.stringify(pizza)
        })
        .then(res => res.json())
        .then(data => {
            if (data.id) {
                add({ pizzaId: data.id })
            }
        })
    }

	const updatePizza = (pizza, id) => {
		fetch(`http://localhost:8000/put/pizza/${id}`, { 
            method: 'PUT',
            headers: {},
            body: pizza
        })
        .then(res => res.json())
        .catch(err => console.error(err))
	}

    const postPizzaVenue = (pizza, pizzaVenue) => {
        fetch("http://localhost:8000/post/tpv", {
            method: 'POST',
            headers: {},
            body: JSON.stringify({ pizza: pizza, pizzaVenue: pizzaVenue })
        })
        .then(res => res.json())
        .then(data => console.log(data))
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
            postPizzaVenue
		}}>
			{children}
		</NetworkContext.Provider>
	);
}