export type Recipe = {
	idMeal: string;
	strMeal: string;
	strMealThumb: string;
	strInstructions: string;
} & Record<string, string | null>;
