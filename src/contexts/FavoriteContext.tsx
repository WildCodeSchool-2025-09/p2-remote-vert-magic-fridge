import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type FavoriteState = {
	favoriteIds: string[];
	setFavoriteIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const FavoriteContext = createContext<FavoriteState>({
	favoriteIds: [],
	setFavoriteIds: () => {},
});

export default function FavoriteProvider({
	children,
}: { children: ReactNode }) {
	const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

	return (
		<FavoriteContext.Provider value={{ favoriteIds, setFavoriteIds }}>
			{children}
		</FavoriteContext.Provider>
	);
}

export const useFavorite = () => {
	return useContext(FavoriteContext);
};
