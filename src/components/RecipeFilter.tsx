import { useState } from "react";
import type { ChangeEvent } from "react";
import "../styles/recipe_filter.css";

function RecipeFilter() {
	const [value, setValue] = useState<number>(50);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(Number(e.target.value));
	};

	const [open, setOpen] = useState(false);
	const toggleMenu = () => {
		setOpen(!open);
	};

	return (
		<>
			<div className="recipe-filter">
				<button type="button" onClick={toggleMenu} className="button-filter">
					<img src="src\assets\images\filter.svg" alt="" width="20px" />
				</button>
				{open && (
					<div className="input-filter">
						<label htmlFor="time">Temps de préparation : {value} min</label>
						<input
							type="range"
							min="0"
							max="240"
							step="5"
							value={value}
							onChange={handleChange}
							className="stick-filter"
						/>
						<div className="input-form">
							<input type="number" min="0" className="input" />
							<label htmlFor="number">Nombre d'ingrédients</label>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default RecipeFilter;
