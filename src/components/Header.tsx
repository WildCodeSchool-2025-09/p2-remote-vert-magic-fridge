import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { TypeAnimation } from "react-type-animation";

import headerImage1 from "../assets/images/header_image_1.jpg";
import headerImage2 from "../assets/images/header_image_2.jpg";
import headerImage3 from "../assets/images/header_image_3.jpg";
import headerImage4 from "../assets/images/header_image_4.jpg";

import "../styles/Header.css";

const headerImages = [headerImage1, headerImage2, headerImage3, headerImage4];

export default function Header() {
	const location = useLocation();
	const [headerImage, setHeaderImage] = useState(headerImages[0]);

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * headerImages.length);
		setHeaderImage(headerImages[randomIndex]);
	}, [location.pathname]);

	return (
		<header className="header">
			<img src={headerImage} alt="Header banner" className="header-image" />
			<div className="header-overlay">
				<TypeAnimation
					sequence={[
						"STRANGER FRIDGE",
						2000,
						"",
						500,
						"FRIGO DE LA MAMA",
						2000,
						"",
						500,
						"NO TIME TO EAT",
						2000,
					]}
					speed={50}
					wrapper="h1"
					repeat={0}
					cursor={false}
					className="header-title"
				/>
			</div>
		</header>
	);
}
