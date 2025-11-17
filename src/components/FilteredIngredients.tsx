import type { Ingredient, SearchType } from "./SearchBar";
import "../styles/SearchBar.css";

export function FilteredIngredients({
	filteredIngredients,
	onSelectIngredient,
	searchType,
	selectedIngredients,
}: {
	filteredIngredients: Ingredient[];
	selectedIngredients: Ingredient[];
	searchType: SearchType;
	onSelectIngredient: (ingredient: Ingredient) => void;
}) {
	if (searchType !== "ingredient") {
		return null;
	}

	return (
		<div className="filteredIngList">
			{filteredIngredients.map((i) => (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					className="filteredIng"
					key={i.idIngredient}
					onClick={() => onSelectIngredient(i)}
					style={{
						backgroundColor: selectedIngredients.some(
							(si) => si.idIngredient === i.idIngredient,
						)
							? "#b9b9b9ff"
							: "#dbdbdbff",
					}}
				>
					{i.strThumb ? (
						<img
							className="filteredIngImage"
							src={i.strThumb}
							alt={i.strIngredient}
						/>
					) : null}
					<span>{i.strIngredient}</span>
				</div>
			))}
		</div>
	);
}
