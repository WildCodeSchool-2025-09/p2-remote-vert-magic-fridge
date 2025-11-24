import { Link } from "react-router";
import "../styles/NavBar.css";

export default function NavBar() {
	return (
		<nav className="global-nav">
			<Link to="/" className="nav-logo">
				<img
					src="/src/assets/images/logo.png"
					alt="logo"
					className="logo-image"
				/>
			</Link>
			<ul className="nav-links">
				<li>
					<a href="/signup">Sign up</a>
				</li>
				<li>
					<a href="/blog">Blog</a>
				</li>
				<li>
					<Link to="/favorite">Favorite</Link>
				</li>
			</ul>
		</nav>
	);
}
