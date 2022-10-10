export default function Favorites() {
	return (
		<div className="bg-green-200 h-3/5 font-black">
			<h2>Recent</h2>
			<div className="grid grid-rows-2 grid-flow-col gap-4">
				<div className="border shadow flex">
					<img src="pizza.png"
						 alt="slice of pizza"
						 className="h-12 w-12"
					/>
					<div>
						<h4>Restaurant name</h4>
						<p className="text-gray-400 font-bold">conclusion</p>
					</div>

				</div>
				<div>
				2
				</div>
				<div>
				3
				</div>
				<div>
				4
				</div>
			</div>
		</div>
	)
}