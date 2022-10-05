export default function Details({ selected }) {
	const url = (image_id) => {
		return 'http://localhost:4000/v1/images/' + image_id
	}

	return (
		<div className="flex flex-col">
			<div className="w-full h-16 bg-white flex flex-row items-center">
			{selected.map(p => (
				p.opinions.map((o, i) => (
					<img
					key={i}
					src={url(o.pizza_image_id)}
					alt="food"
					className="h-14 w-14 rounded mr-2"
					onClick={() => console.log(o)}
					/>
			))))}
			</div>
			<p className="text-xs font-black">You're reviews ⬆️</p>
		</div>
	)
}