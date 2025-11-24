import type { RecipeType } from "../types/recipe";
import type { Recipe } from "../types/search";
import RecipeCard from "./RecipeCard";

export default function Suggestions({ recipes }: { recipes: Recipe[] }) {
	const randomizedRecipes = [...recipes]
		.sort(() => Math.random() - 0.5)
		.slice(0, 8);

	return (
		<>
			{randomizedRecipes.map((recipe) => (
				<RecipeCard recipe={recipe as RecipeType} key={recipe.idMeal} />
			))}
		</>
	);
}
