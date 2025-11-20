import starEmpty from "../assets/images/favoris_empty.png";
import starFull from "../assets/images/favoris_full.png";
import type { RecipeType } from "../types/recipe";
import prepTime from "../utils/prepTime";
import "../styles/RecipeCard.css";
import { useState } from "react";
import prepIcon from "../assets/images/preparation_time.png";
import { useFavorite } from "../contexts/FavoriteContext";

export interface RecipeCardProps {
	recipe: RecipeType;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
	const { favoriteIds, setFavoriteIds } = useFavorite();
	const [isFavorite, setIsFavorite] = useState(false);

	function toggleFavorite(idMeal: string) {
		if (!favoriteIds.includes(idMeal)) {
			setFavoriteIds([...favoriteIds, idMeal]);
		} else if (favoriteIds.includes(idMeal)) {
			setFavoriteIds(
				favoriteIds.filter((element) => {
					return element !== idMeal;
				}),
			);
		}
	}

	return (
		<>
			<article className="recipe-card">
				<img
					src={recipe.strMealThumb}
					alt={recipe.strMeal}
					className="recipe-card-picture"
				/>
				<h2>{recipe.strMeal}</h2>
				<hr />
				<span className="recipe-card-infos">
					<p className="recipe-card-prep-time">
						<img src={prepIcon} alt="" width={24} />
						{prepTime(recipe.strInstructions, recipe.idMeal)} min
					</p>
					<button type="button" className="recipe-card-button">
						Recipe
					</button>
					<button
						type="button"
						onClick={() => setIsFavorite(!isFavorite)}
						aria-pressed={isFavorite}
						aria-label={
							isFavorite ? "Remove from favorites" : "Add to favorites"
						}
						className="recipe-card-favorites"
					>
						<img src={isFavorite ? starFull : starEmpty} width={24} alt="" />
					</button>
				</span>
			</article>
		</>
	);
}
