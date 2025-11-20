import RecipeCard from "../components/RecipeCard";
import { useFavorite } from "../contexts/FavoriteContext";
import "../styles/Favorite.css";

export default function Favorite() {
	const { favoriteIds, setFavoriteIds } = useFavorite();

	return (
		<>
			<section className="favorites-recipes-cards" />
		</>
	);
}
