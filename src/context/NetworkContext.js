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

    const getImage = async id => {
        await fetch(`http://localhost:8000/image/${id}`, {
            method: 'GET',
            headers: {},
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
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

    const postTaste = taste => {
		fetch("http://localhost:8000/post/taste", { 
            method: 'POST',
            headers: {},
            body: JSON.stringify(taste)
        })
        .then(res => res.json())
        .then(data => {
            if (data.id) {
                add({ tasteId: data.id })
            }
        })
        .catch(err => console.error(err))
    }

	const updateTaste = async (taste, id) => {
		await fetch(`http://localhost:8000/put/taste/${id}`, { 
            method: 'PUT',
            headers: {},
            body: taste
        })
        .then(res => res.json())
        .catch(err => console.error(err))
	}

	const postPizza = async pizza => {
		return
	}

	const updatePizza = async (pizza, id) => {
		await fetch(`http://localhost:8000/put/pizza/${id}`, { 
            method: 'PUT',
            headers: {},
            body: pizza
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
			postTaste,
			updateTaste,
			postPizza,
			updatePizza
		}}>
			{children}
		</NetworkContext.Provider>
	);
}