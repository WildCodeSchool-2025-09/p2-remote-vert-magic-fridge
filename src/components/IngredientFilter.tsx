import { useState } from "react";
import type { ChangeEvent } from "react";
import "../styles/ingredient_filter.css";

function IngredientFilter() {
	const [time, setTime] = useState<number>(50);
	const selectedTime = (e: ChangeEvent<HTMLInputElement>) => {
		setTime(Number(e.target.value));
	};

	const [meal, setMeal] = useState<string>("");
	const selectedMeal = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setMeal(e.target.value);
	};

	const [calorie, setCalorie] = useState<number>(500);
	const selectedCalorie = (e: ChangeEvent<HTMLInputElement>) => {
		setCalorie(Number(e.target.value));
	};

	const [compatibility, setCompatibility] = useState<number>(50);
	const selectedCompatibility = (e: ChangeEvent<HTMLInputElement>) => {
		setCompatibility(Number(e.target.value));
	};

	const [open, setOpen] = useState(false);
	const [closing, setClosing] = useState(false);
	const toggleMenu = () => {
		if (open) {
			setClosing(true);
			setTimeout(() => {
				setOpen(false);
				setClosing(false);
			}, 300);
		} else {
			setOpen(true);
		}
	};

	return (
		<>
			<div className="recipe-filter">
				<button type="button" onClick={toggleMenu} className="button-filter">
					<img src="src\assets\images\filter.svg" alt="" />
				</button>
				{(open || closing) && (
					<div className={`input-filter ${closing ? "closing" : "open"}`}>
						<label htmlFor="time">Temps de préparation : {time} min</label>
						<input
							type="range"
							min="0"
							max="240"
							step="1"
							value={time}
							onChange={selectedTime}
							className="stick-filter"
						/>
						<div className="input-form">
							<select
								id="meal"
								value={meal}
								onChange={selectedMeal}
								className="input"
							>
								<option value="">-- Chose --</option>
								<option value="Beef">Beef</option>
								<option value="Breakfast">Breakfast</option>
								<option value="Chicken">Chicken</option>
								<option value="Dessert">Dessert</option>
								<option value="Goat">Goat</option>
								<option value="Lamb">Lamb</option>
								<option value="Miscellaneous">Miscellaneous</option>
								<option value="Pasta">Pasta</option>
								<option value="Pork">Pork</option>
								<option value="Seafood">Seafood</option>
								<option value="Side">Side</option>
								<option value="Starter">Starter</option>
								<option value="Vegan">Vegan</option>
								<option value="Vegetarian">Vegetarian</option>
							</select>
							<label htmlFor="meal">Meal's type</label>
						</div>
						<div className="input-form">
							<input
								type="number"
								min="0"
								max="100"
								step="10"
								className="input"
								value={compatibility}
								onChange={selectedCompatibility}
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
							onChange={selectedCalorie}
							className="stick-filter"
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default IngredientFilter;
