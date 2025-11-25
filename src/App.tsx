import { Outlet, useLocation } from "react-router";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import "./styles/reset.css";
import "./index.css";
import "./App.css";

function App() {
	const location = useLocation();
	const hideHeader = location.pathname.startsWith("/recipe/");

	return (
		<div className="app-root">
			<NavBar />
			{!hideHeader && <Header />}
			<Outlet />
			<Footer />
		</div>
	);
}

export default App;
