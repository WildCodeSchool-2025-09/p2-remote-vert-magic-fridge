import { Link, Outlet } from "react-router";
import "./App.css";
import "./index.css";
import "./styles/reset.css";
import NavBar from "./components/NavBar";

function App() {
	return (
		<>
			<NavBar />
			<Link to="/">Home</Link>
			<Link to="/favorite">Favorite</Link>
			<Outlet />
		</>
	);
}

export default App;
