import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import "./index.css";
import FavoriteProvider from "./contexts/FavoriteContext";

createRoot(document.getElementById("root") || document.body).render(
	<FavoriteProvider>
		<RouterProvider router={router} />,
	</FavoriteProvider>,
);
