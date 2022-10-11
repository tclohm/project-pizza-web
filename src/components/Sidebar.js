export default function Sidebar() {
	return (
		<div className="relative flex md:flex-col justify-center md:justify-start md:items-center bg-yellow-200 h-full md:w-1/4 text-sm font-medium text-gray-400">
			<img
				src="placeholder.jpg"
				alt="profile"
				className="rounded h-56 w-56 mt-6"
			/>
			<div className="self-center md:self-start ml-4 p-2">
			<p className="text-lg font-black text-black">Danny McNobody</p>
			<p>@mcnope</p>
			<div className="mt-4">
				<ul className="flex flex-col">
					<li>
						<i className="far fa-building mr-1 py-1"></i>
						<span>Empty Spaces</span>
					</li>
					<li>
						<i className="fa fa-map-pin px-1 py-1"></i>
						<span>Santa Barbara</span>
					</li>
					<li>
						<i className="fas fa-link mr-1 py-1"></i>
						<span>http://example.com</span>
					</li>
				</ul>
			</div>
			</div>
		</div>
	)
}