import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import FavoriteProvider from "./contexts/FavoriteContext";
import { router } from "./router";

createRoot(document.getElementById("root") || document.body).render(
	<FavoriteProvider>
		<RouterProvider router={router} />,
	</FavoriteProvider>,
);
