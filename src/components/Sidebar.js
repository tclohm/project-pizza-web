export default function Sidebar() {
	return (
		<div className="relative h-full flex flex-col items-center bg-yellow-200 h-full w-1/4 text-sm font-medium text-gray-400">
			<img
				src="placeholder.jpg"
				alt="profile"
				className="rounded h-56 w-56 mt-6"
			/>
			<div className="self-start ml-4 p-2">
			<p className="text-lg font-black text-black">Danny McNobody</p>
			<p>@mcnope</p>
			<div className="mt-4">
				<p><i className="far fa-building"></i> empty spaces</p>
				<p><i className="far fa-map-pin"></i> Santa Barbara</p>
				<p><i className="fas fa-link"></i> links</p>
			</div>
			</div>
		</div>
	)
}