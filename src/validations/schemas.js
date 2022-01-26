import * as yup from 'yup';

export let venueSchema = yup.object().shape({
	name: yup.string().required(),
	latitude: yup.number().required(),
	longitude: yup.number().required(),
	address: yup.string().required()
})

export let pizzaSchema = yup.object().shape({
	name: yup.string().required(),
	style: yup.string().required(),
	price: yup.number().required(),
	cheesiness: yup.number().required(),
	flavor: yup.number().required(),
	sauciness: yup.number().required(),
	saltiness: yup.number().required(),
	charness: yup.number().required(),
	description: yup.string().required()
})

