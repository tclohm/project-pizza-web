import PizzaStyle from "../components/PizzaStyle";

export default function Detail({ pizza }) {

	const url = (image_id) => {
		return 'http://localhost:4000/v1/images/' + image_id

	}
	return (
		<div>
			{pizza.opinions.map(obj => (
				<div key={obj.pizza_id} className="flex flex-col justify-between">
				<div className="flex justify-between border-b mx-2">
					<p className="absolute bg-green-500 rounded-full text-white h-8 w-8 flex justify-center items-center font-semibold text-xs shadow">
						${obj.price}
					</p>
					<div className="flex m-2">
						<img 
						src={url(obj.pizza_image_id)} 
						alt="food"
						className="lg:h-24 lg:w-24 h-16 w-16 rounded" />
						<div className="flex items-start mx-2">
							<div className="flex flex-col">
								<p className="lg:text-xl text-lg font-bold px-1">{pizza.name ? pizza.name : pizza.pizza_name}</p>
								<PizzaStyle input={pizza} />
								<p className="text-gray-300 font-black text-2xl">{obj.conclusion}</p>
							</div>
						</div>
					</div>
					<p className="font-light text-xs">{new Date(obj.created_at).toDateString()}</p>
				</div>
				<div className="absolute right-2">
					<div className="flex justify-center mt-4 xl:mt-10">
						<div className="flex flex-col items-center">
							<label
							 name="Cheesiness"
							 style={{ fontSize: '2rem' }}
							 className="h-8 w-8 flex justify-center"
							>🧀</label>
							<p className="relative bottom-0 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{obj.cheesiness}</p>
						</div>
						<div className="flex flex-col items-center">
							<label
							 name="Flavor"
							 style={{ fontSize: '2rem' }}
							 className="h-8 w-8 flex justify-center"
							>👅</label>
							<p className="relative bottom-0 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{obj.flavor}</p>
						</div>
						<div className="flex flex-col items-center">
							<label
							 name="Sauciness"
							 style={{ fontSize: '2rem' }}
							 className="h-8 w-8 flex justify-center"
							>🍅</label>
							<p className="relative bottom-0 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{obj.sauciness}</p>
						</div>
						<div className="flex flex-col items-center">
							<label
							 name="Saltiness"
							 style={{ fontSize: '2rem' }}
							 className="h-8 w-8 flex justify-center"
							>🧂</label>
							<p className="relative bottom-0 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{obj.saltiness}</p>
						</div>
						<div className="flex flex-col items-center">
							<label
							 name="Char"
							 style={{ fontSize: '2rem' }}
							 className="h-8 w-8 flex justify-center"
							>🔥</label>
							<p className="relative bottom-0 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{obj.charness}</p>
						</div>
						<div className="flex flex-col items-center">
							<label
							 name="Spiciness"
							 style={{ fontSize: '2rem' }}
							 className="h-8 w-8 flex justify-center"
							>🌶</label>
							<p className="relative bottom-0 bg-yellow-400 rounded-full h-8 w-8 flex justify-center items-center font-black">{obj.charness}</p>
						</div>
					</div>
				</div>
			</div>
			))}
			
		</div>
	)

}