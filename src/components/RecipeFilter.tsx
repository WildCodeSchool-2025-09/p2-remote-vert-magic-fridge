import { useState } from "react";
import type { ChangeEvent } from "react";
import "../styles/recipe_filter.css";

function RecipeFilter() {
	const [time, setTime] = useState<number>(50);
	const selectedTime = (e: ChangeEvent<HTMLInputElement>) => {
		setTime(Number(e.target.value));
	};

	const [ing, setNbrIng] = useState<number>(2);
	const selectedIng = (e: ChangeEvent<HTMLInputElement>) => {
		setNbrIng(Number(e.target.value));
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
					<img src="src\assets\images\filter.svg" alt="Icon filter" />
				</button>
				{(open || closing) && (
					<div className={`input-filter ${closing ? "closing" : "open"}`}>
						<label htmlFor="time">Temps de préparation : {time} min</label>
						<input
							type="range"
							min="0"
							max="120"
							step="1"
							value={time}
							onChange={selectedTime}
							className="stick-filter"
						/>
						<div className="input-form">
							<input
								type="number"
								min="0"
								className="input"
								value={ing}
								onChange={selectedIng}
							/>
							<label htmlFor="number">Nombre d'ingrédients</label>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default RecipeFilter;
