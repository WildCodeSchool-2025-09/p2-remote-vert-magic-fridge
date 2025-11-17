import type { Ingredient, SearchType } from "./SearchBar";
import "../styles/SearchBar.css";

export function SelectedIngredients({
	selectedIngredients,
	onRemoveIngredient,
	searchType,
}: {
	selectedIngredients: Ingredient[];
	searchType: SearchType;
	onRemoveIngredient: (ingredient: Ingredient) => void;
}) {
	if (searchType !== "ingredient") {
		return null;
	}

	return (
		<div className="selectedIngs">
			{selectedIngredients.map((i) => (
				<div className="selectedIngCard" key={i.idIngredient}>
					{i.strThumb ? (
						<img
							className="selectedIngImage"
							src={i.strThumb}
							alt={i.strIngredient}
						/>
					) : null}
					<span style={{ fontSize: 14, fontWeight: "bold" }}>
						{i.strIngredient}
					</span>
					<button
						className="selectedIngBtn"
						type="button"
						onClick={() => {
							onRemoveIngredient(i);
						}}
					>
						X
					</button>
				</div>
			))}
		</div>
	);
}
