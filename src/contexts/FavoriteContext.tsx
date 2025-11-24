import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Recipe } from "../types/search";

type FavoriteState = {
	favoriteRecipes: Recipe[];
	setFavoriteRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

const FavoriteContext = createContext<FavoriteState>({
	favoriteRecipes: [],
	setFavoriteRecipes: () => {},
});

export default function FavoriteProvider({
	children,
}: { children: ReactNode }) {
	const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

	return (
		<FavoriteContext.Provider value={{ favoriteRecipes, setFavoriteRecipes }}>
			{children}
		</FavoriteContext.Provider>
	);
}

export const useFavorite = () => {
	return useContext(FavoriteContext);
};
