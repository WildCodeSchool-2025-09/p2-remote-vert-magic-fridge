import type { Ingredient, SearchType } from "./SearchBar";

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
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "start",
				marginTop: 20,
				width: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					gap: 16,
					flexWrap: "wrap",
					width: "100%",
				}}
			>
				{selectedIngredients.map((i) => (
					<div
						key={i.idIngredient}
						style={{
							backgroundColor: "#e9e9e9ff",
							borderRadius: 4,
							display: "flex",
							gap: 2,
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "space-around",
							width: "100%",
							maxWidth: 120,
							position: "relative",
							paddingBottom: "0.5em",
							fontFamily: "var(--text-font)",
						}}
					>
						{i.strThumb ? (
							<img
								src={i.strThumb}
								alt={i.strIngredient}
								style={{
									width: "100%",
									height: "auto",
									maxWidth: 80,
								}}
							/>
						) : null}
						<span style={{ fontSize: 14, fontWeight: "bold" }}>
							{i.strIngredient}
						</span>
						<button
							type="button"
							style={{
								position: "absolute",
								top: "0",
								right: "0",
								border: "none",
								fontFamily: "Arial",
								transform: "translate(50%, -50%)",
								backgroundColor: "lightgray",
								borderRadius: "9999px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: "24px",
								height: "24px",
								color: "black",
								fontWeight: 800,
							}}
							onClick={() => {
								onRemoveIngredient(i);
							}}
						>
							X
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
