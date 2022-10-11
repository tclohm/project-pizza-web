import Sidebar from "../components/Sidebar";
import Favorites from "../components/Favorites";
import Activity from "../components/Activity";

export default function Profile() {
	return (
		<div className="absolute flex flex-col md:flex-row h-5/6 w-screen">
			<Sidebar/>
			<div className="flex flex-col justify-around w-full">
				<Favorites />
				<Activity />
			</div>
		</div>
	)
}