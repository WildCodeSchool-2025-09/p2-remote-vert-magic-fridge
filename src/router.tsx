import "./index.css";
import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Favorite from "./pages/Favorite.tsx";
import Home from "./pages/Home.tsx";
import Recipes from "./pages/Recipes.tsx";

export const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/favorite",
				element: <Favorite />,
			},
			{
				path: "/recipe",
				element: <Recipes />,
			},
		],
	},
]);
