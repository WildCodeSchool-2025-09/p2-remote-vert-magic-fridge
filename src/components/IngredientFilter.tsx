import { useState } from "react";
import type { ChangeEvent } from "react";
import "../styles/ingredient_filter.css";

function IngredientFilter() {
	const [value, setValue] = useState<number>(50);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(Number(e.target.value));
	};

	const [calorie, setCalorie] = useState<number>(50);
	const calorieSelected = (e: ChangeEvent<HTMLInputElement>) => {
		setCalorie(Number(e.target.value));
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
							step="1"
							value={value}
							onChange={handleChange}
							className="stick-filter"
						/>
						<div className="input-form">
							<input type="number" min="0" className="input" />
							<label htmlFor="number">Nombre d'ingrédients</label>
						</div>
						<div className="input-form">
							<input
								type="number"
								min="0"
								max="100"
								step="10"
								className="input"
							/>
							<label htmlFor="number">Compatibilité en %</label>
						</div>
						<label htmlFor="time">calories max : {calorie} kcal</label>
						<input
							type="range"
							min="0"
							max="1000"
							step="1"
							value={calorie}
							onChange={calorieSelected}
							className="stick-filter"
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default IngredientFilter;
