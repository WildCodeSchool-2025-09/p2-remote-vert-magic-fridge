import "../styles/printbutton.css";

function PrintButton() {
	const handlePrint = () => {
		window.print();
	};
	return (
		<button type="button" onClick={handlePrint} className="print-icon">
			<img src="src\assets\images\printer.png" alt="Printer's icon" />
		</button>
	);
}
export default PrintButton;
