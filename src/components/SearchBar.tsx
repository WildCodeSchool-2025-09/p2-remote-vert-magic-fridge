import { useEffect, useMemo, useState } from "react";
import "../styles/SearchBar.css";
import { FilteredIngredients } from "./FilteredIngredients";
import { SelectedIngredients } from "./SelectedIngredients";
import { SuggestedRecipies } from "./SuggestedRecipes";

export type Meal = {
	idMeal: string;
	strMeal: string;
	strMealAlternate: string | null;
	strCategory: string | null;
	strArea: string | null;
	strInstructions: string | null;
	strMealThumb: string | null;
	strTags: string | null;
	strYoutube: string | null;

	// Ingredients 1–20
	strIngredient1: string | null;
	strIngredient2: string | null;
	strIngredient3: string | null;
	strIngredient4: string | null;
	strIngredient5: string | null;
	strIngredient6: string | null;
	strIngredient7: string | null;
	strIngredient8: string | null;
	strIngredient9: string | null;
	strIngredient10: string | null;
	strIngredient11: string | null;
	strIngredient12: string | null;
	strIngredient13: string | null;
	strIngredient14: string | null;
	strIngredient15: string | null;
	strIngredient16: string | null;
	strIngredient17: string | null;
	strIngredient18: string | null;
	strIngredient19: string | null;
	strIngredient20: string | null;

	strIngredients: string[];

	strSource: string | null;
	strImageSource: string | null;
	strCreativeCommonsConfirmed: string | null;
	dateModified: string | null;
};

export type Ingredient = {
	idIngredient: string;
	strIngredient: string;
	strDescription: string | null;
	strThumb: string | null;
	strType: string | null;
};

export type SearchType = "recipe" | "ingredient";

async function loadRecipes() {
	const urls = [
		"https://www.themealdb.com/api/json/v1/1/search.php?f=a",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=b",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=c",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=d",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=e",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=f",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=g",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=h",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=i",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=j",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=k",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=l",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=m",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=n",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=o",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=p",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=q",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=r",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=s",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=t",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=u",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=v",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=w",
		"https://www.themealdb.com/api/json/v1/1/search.php?f=y",
	];

	const responses = await Promise.all(urls.map((url) => fetch(url)));
	const results = await Promise.all(responses.map((res) => res.json()));
	const allMealsRaw: Meal[] = results.flatMap((r) => r.meals || []);

	/*Extraire les ingrédients de chaque recette et renvoyer une version qui contient la recette et un tableau d'ingrédients */
	const meals = allMealsRaw.map((meal) => {
		const strIngredients: string[] = [];

		for (let i = 1; i <= 20; i++) {
			const ingredient = meal[`strIngredient${i}` as keyof Meal];
			if (
				ingredient &&
				typeof ingredient === "string" &&
				ingredient.trim() !== ""
			) {
				strIngredients.push(ingredient);
			}
		}

		return { ...meal, strIngredients };
	});

	return meals;
}

async function loadIngredients() {
	const response = await fetch(
		"https://www.themealdb.com/api/json/v1/1/list.php?i=list",
	);
	const result = await response.json();
	return result.meals as Ingredient[];
}

export function SearchBar() {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
		[],
	);
	const [meals, setMeals] = useState<Meal[]>([]);
	useEffect(() => {
		loadRecipes().then((mealsFromApi) => setMeals(mealsFromApi));
		loadIngredients().then((ingredientsFromAPI) =>
			setIngredients(ingredientsFromAPI),
		);
	}, []);

	const [searchType, setSearchType] = useState<SearchType>("ingredient");
	const [search, setSearch] = useState<string>("");

	const filteredMeals =
		search.trim() === ""
			? []
			: meals.filter((m) =>
					m.strMeal?.toLowerCase()?.includes(search?.toLowerCase()),
				);

	const filteredIngredients = useMemo(() => {
		if (search.trim() === "") {
			return [];
		}

		const filter = ingredients.filter((i) => {
			return i.strIngredient.toLowerCase().includes(search.toLowerCase());
		});

		return filter;
	}, [search, ingredients]);

	return (
		<div>
			<div className="search">
				<div
					className="search-switch"
					style={{
						backgroundColor:
							searchType === "recipe"
								? "var(--bg-color-brightred)"
								: "var(--bg-color-darkred)",
					}}
				>
					<span>{searchType === "recipe" ? "Recipe" : "Ingredient"}</span>
					<input
						type="checkbox"
						checked={searchType === "ingredient"}
						id="switch"
						name="switch"
						onChange={() =>
							setSearchType(searchType !== "recipe" ? "recipe" : "ingredient")
						}
					/>
					<label htmlFor="switch">""</label>
				</div>

				<div className="search-bar">
					<input
						placeholder={
							searchType === "recipe"
								? "Search a recipe"
								: "Enter your ingredients"
						}
						value={search}
						className="search-input"
						onChange={(event) => {
							setSearch(event.target.value);
						}}
					/>
					<button type="button" className="search-btn">
						<img src="src/assets/images/search.png" alt="Search icon" />
					</button>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 12,
					width: "100%",
				}}
			>
				{searchType === "recipe"
					? filteredMeals.map((m) => <li key={m.idMeal}>{m.strMeal}</li>)
					: null}

				<FilteredIngredients
					searchType={searchType}
					filteredIngredients={filteredIngredients}
					selectedIngredients={selectedIngredients}
					onSelectIngredient={(i) => {
						// On vérifie que l'ingrédient n'ait pas déjà été ajouté
						const hasAlreadyBeenAdded = selectedIngredients.some(
							(selectedIngredient) =>
								i.idIngredient === selectedIngredient.idIngredient,
						);

						// Si l'ingrédient a déjà été select, on ne l'ajoute pas (sinon il sera en double)
						if (!hasAlreadyBeenAdded) {
							setSelectedIngredients([...selectedIngredients, i]);
						}

						setSearch("");
					}}
				/>

				<SelectedIngredients
					onRemoveIngredient={(ingredientToRemove) => {
						const newIngredients = selectedIngredients.filter(
							(selectedIngredient) =>
								selectedIngredient.idIngredient !==
								ingredientToRemove.idIngredient,
						);
						setSelectedIngredients(newIngredients);
					}}
					selectedIngredients={selectedIngredients}
					searchType={searchType}
				/>

				<SuggestedRecipies
					selectedIngredients={selectedIngredients}
					meals={meals}
					searchType={searchType}
				/>
			</div>
		</div>
	);
}
