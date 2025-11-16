import type { RefObject } from "react";
import { useReactToPrint } from "react-to-print";

type PrintRecipeButtonProps = {
	printRef: RefObject<HTMLDivElement>;
	className?: string;
	icon: string;
};

export default function PrintRecipeButton({
	printRef,
	className = "",
	icon,
}: PrintRecipeButtonProps) {
	const handlePrint = useReactToPrint({
		contentRef: printRef,
		documentTitle: "Recipe",
	});

	return (
		<button
			type="button"
			onClick={handlePrint}
			className={className}
			title="Print"
		>
			<img src={icon} alt="Print the recipe" />
		</button>
	);
}
