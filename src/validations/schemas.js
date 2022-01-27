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
	description: yup.string().required()
})


export let tasteSchema = yup.object().shape({
	cheesiness: yup.number().required(),
	flavor: yup.number().required(),
	sauciness: yup.number().required(),
	saltiness: yup.number().required(),
	charness: yup.number().required()
})

export let priceSchema = yup.object().shape({
	price: yup.number().required().min(0).max(500)
})

