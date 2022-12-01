import { Link, useLocation } from "react-router-dom"
export default function Header() {
	const location = useLocation()

	return (
		<nav className="border-b border-gray-200 py-4 flex items-center justify-between px-6">
			<h1 id="pizzatime">
				foodcamp
			</h1>
			{location.pathname === "/" ?
			<Link to="/profile"><i className="fas fa-home"></i></Link>
			:
			<Link to="/"><i className="fas fa-camera"></i></Link>
			}
		</nav>
	)
}