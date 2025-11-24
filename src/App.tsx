import { Link, Outlet } from "react-router";
import "./App.css";
import "./index.css";
import "./styles/reset.css";
import NavBar from "./components/NavBar";

function App() {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
}

export default App;
