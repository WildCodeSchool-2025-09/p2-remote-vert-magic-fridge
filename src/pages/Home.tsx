import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useFavorite } from "../contexts/FavoriteContext";
import { SearchBar } from "../components/SearchBar";
import type { RecipeType } from "../types/recipe";
import "../styles/Home.css";
import type { RecipeType } from "../types/recipe";

export default function Home() {
	const { favoriteIds, setFavoriteIds } = useFavorite();
	const [recipes, setRecipes] = useState<RecipeType[]>([]);

	const getRecipes = () => {
		fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
			.then((response) => response.json())
			.then((data) => {
				setRecipes(data.meals);
			});
	};

	return (
		<>
			<SearchBar />
			<section className="recipes-cards">
				{recipes.map((recipe) => {
					return (
						<div key={recipe.idMeal} className="recipe-placeholder">
							{recipe.strMeal}
						</div>
					);
				})}

				<button type="button" onClick={getRecipes}>
					Get recipes
				</button>
			</section>
		</>
	);
}
