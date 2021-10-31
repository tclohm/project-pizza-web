import { createContext, useContext } from "react";
import { PizzaInputContext } from "./PizzaInputContext";
// const POST_IMAGE = 'POST_IMAGE';

// const POST_LOCATION = 'POST_LOCATION';
// const UPDATE_LOCATION = 'UPDATE_LOCATION';

// const POST_TASTE = 'POST_TASTE';
// const UPDATE_TASTE = 'UPDATE_TASTE';

// const POST_PIZZA = 'POST_PIZZA'

// pizzaName: '',
// 	imageId: '',
// 	location: {
// 		venueName: '',
// 		lat: null,
// 		lon: null,
// 		address: '',
// 	},
// 	style: '',
// 	details: '',
// 	tasteId: null,

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

    const postVenue = async venue => {
    	await fetch("http://localhost:8000/post/venue", { 
            method: 'POST',
            headers: {},
            body: venue
        })
        .then(res => res.json())
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

    const postTaste = async taste => {
		await fetch("http://localhost:8000/post/taste", { 
            method: 'POST',
            headers: {},
            body: taste
        })
        .then(res => res.json())
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