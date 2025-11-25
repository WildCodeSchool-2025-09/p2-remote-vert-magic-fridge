import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import cookingTimeIcon from "../assets/images/cooking-time.png";
import eatingPersonIcon from "../assets/images/eating-person.png";
import starEmpty from "../assets/images/favoris_empty.png";
import starFull from "../assets/images/favoris_full.png";
import printerIcon from "../assets/images/printer.png";
import CalorieInfo from "../components/CalorieInfo";
import type { Recipe } from "../types/search";

import "../styles/RecipeSheet.css";
import { useFavorite } from "../contexts/FavoriteContext";

export default function RecipeSheet() {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { id } = useParams<{ id: string }>();
	const { favoriteRecipes, setFavoriteRecipes } = useFavorite();
	const isFavorite = favoriteRecipes.includes(recipe as Recipe);
	const printRef = useRef<HTMLDivElement | null>(null);

	const handlePrint = useReactToPrint({
		contentRef: printRef,
		documentTitle: "Recipe",
	});

	function toggleFavorite() {
		if (!favoriteRecipes.find((recipe) => recipe.idMeal === id)) {
			setFavoriteRecipes((prev) => [...prev, recipe]);
		}
	}

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await fetch(
					`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
				);

				if (!response.ok) {
					throw new Error("Erreur API");
				}

				const recipeData = await response.json();
				setRecipe(recipeData.meals[0]);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Erreur inconnue");
				}
			} finally {
				setLoading(false);
			}
		};

		void fetchRecipe();
	}, [id]);

	if (loading) {
		return <p className="loading">Loading...</p>;
	}

	if (error || !recipe) {
		return <p className="error">Unable to load the recipe.</p>;
	}

	const ingredients: string[] = [];
	const ingredientsLoading: string[] = [];

	const ing = Object.values(recipe).slice(9, 29);
	const measure = Object.values(recipe).slice(29, 49);
	const space = " - ";

	for (let i = 0; i <= 19; i++) {
		if (
			typeof ing[i] !== "string" ||
			ing[i] !== "" ||
			ing[i] !== " " ||
			typeof measure[i] === "string" ||
			measure[i] !== "" ||
			measure[i] !== " "
		) {
			const calorieSearch = ((ing[i] as string) +
				space +
				(measure[i] === " " ? "to taste" : measure[i])) as string;
			ingredientsLoading.push(calorieSearch);
		}
	}

	for (let i = 0; i <= 19; i++) {
		if (
			ingredientsLoading[i] !== " " &&
			ingredientsLoading[i] !== "" &&
			typeof ingredientsLoading[i] === "string" &&
			ingredientsLoading[i] !== " - " &&
			ingredientsLoading[i] !== " -  " &&
			ingredientsLoading[i] !== " - to taste"
		) {
			ingredients.push(ingredientsLoading[i]);
		}
	}

	return (
		<main className="recipe-sheet">
			<div ref={printRef}>
				<header className="recipe-header">
					<section className="recipe-hero">
						<section className="recipe-hero-text">
							<p>Recipe</p>
							<h1>{recipe.strMeal}</h1>

							<section className="recipe-buttons">
								<div className="recipe-buttons-row recipe-buttons-row--top">
									<button
										type="button"
										className="icon-button icon-button--primary icon-button--favorite"
										title="Favorites"
										onClick={() => toggleFavorite()}
										aria-pressed={isFavorite}
										aria-label={
											isFavorite ? "Remove from favorites" : "Add to favorites"
										}
									>
										<img
											src={isFavorite ? starFull : starEmpty}
											width={24}
											alt=""
										/>
									</button>
									<button
										type="button"
										onClick={handlePrint}
										className="icon-button icon-button--primary icon-button--print"
										title="Print"
									>
										<img src={printerIcon} alt="Print the recipe" />
									</button>
								</div>

								<CalorieInfo meal={recipe} className="recipe-kcal-styled" />

								<ul className="recipe-tags recipe-buttons-row recipe-buttons-row--bottom">
									<li title="cooking time: 30 min">
										<button
											type="button"
											className="icon-button icon-button--info"
											aria-label="cooking time: 30 min"
										>
											<img src={cookingTimeIcon} alt="" />
										</button>
										<span className="recipe-tag-text">30 min</span>
									</li>

									<li title="serves 6 people">
										<button
											type="button"
											className="icon-button icon-button--info"
											aria-label="serves 6 people"
										>
											<img src={eatingPersonIcon} alt="" />
										</button>
										<span className="recipe-tag-text">6 people</span>
									</li>
								</ul>
							</section>
						</section>

						<figure className="recipe-hero-figure">
							<img src={recipe.strMealThumb} alt={recipe.strMeal} />
						</figure>
					</section>
				</header>

				<section className="recipe-main">
					<aside className="ingredients-panel">
						<h2>Ingredients</h2>
						<ul>
							{ingredients.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</aside>

					<article className="preparation-panel">
						<h2>Preparation</h2>
						{recipe.strInstructions
							?.split(/\r?\n/)
							.filter((p: string) => p.trim() !== "")
							.map((p: string) => (
								<p key={p}>{p}</p>
							))}
					</article>
				</section>
			</div>

			<footer className="recipe-footer">
				<p>© Magic Fridge - 2025</p>
			</footer>
		</main>
	);
}
