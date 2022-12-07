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
        	if (data.image.id) {
        		add({ imageId: data.image.id })
        	}
        })
        .catch(err => console.error(err))
        
    }

    const getImage = async imageId => {
        const res = await fetch(`${url}/images/${imageId}`)
        return res
    }

    const postVenue = venue => { 
        fetch(`${url}/venues`, { 
            method: 'POST',
            headers: {},
            body: JSON.stringify(venue)
        })
        .then(res => res.json())
        .then(data => {
            if (data.venue.id) {
                add({ venueId: data.venue.id })
            }
        })
        .catch(err => console.error(err))
    }

    const updateVenue = async (venue, id) => {
    	await fetch(`${url}/venues/${id}`, { 
            method: 'PATCH',
            headers: {},
            body: venue
        })
        .then(res => res.json())
        .catch(err => console.error(err))
    }

    const postReview = async review => {
            const res = await fetch(`${url}/reviews`, {
                method: 'POST',
                headers: {},
                body: JSON.stringify(review)
            })
            .then(res => res.json())
            .then(data => {
                if (data.review.id) {
                    return data.review.id
                }
            }).catch(err => {
                console.error(err)
            })
            return res
    }

    const postPizza = async pizza => {
        const res = await fetch(`${url}/pizzas`, {
                 method: 'POST',
                headers: {},
                body: JSON.stringify(pizza)
            })
            .then(res => res.json())
            .then(data => {
                if (data.pizza.id) {
                    return data.pizza.id
                }
            }).catch(err => {
                console.error(err)
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

    const getVenuesPizza = async () => {
        const res = await fetch(`${url}/venuepizzas`, {
            method: 'GET',
            headers: {},
        })
        return res
    }

    const getVenue = async (id) => {
        const res = await fetch(`${url}/venues/${id}`, {
            method: 'GET',
            headers: {},
        })
        return res
    }

	return (
		<NetworkContext.Provider value={{  
			upload,
			getImage,
			postVenue,
			updateVenue,
            postReview,
            postPizza,
            updatePizza,
            postVenuePizza,
            getVenuesPizza,
            getVenue
		}}>
			{children}
		</NetworkContext.Provider>
	);
}