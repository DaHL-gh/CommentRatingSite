import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import "./style.css";
import Diagrams from "../diagrams/Diagrams";
import fetchData from "../../utils/fetchData";
import ParticlesComponent from "../Particles/particles";

const Main = () => {
	const inputRef = useRef();
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = async (event) => {
		event.preventDefault();
		const url = inputRef.current.value;
		const data = await fetchData(url); // Use the fetchData function
		if (data) {
			setInputValue(data.first_field); // Assume the server returns an object with a message field
		}
		inputRef.current.value = "";
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.2 } }}
		>
			<div className="main">
				<Diagrams className="diogram" />
				<p>{inputValue}</p>
				<form onSubmit={handleInputChange}>
					<input
						className="main_input"
						type="text"
						ref={inputRef}
						placeholder="Введите ссылку"
					/>
					<button className="btn1" type="submit">
						➤
					</button>
				</form>
				{/* <ParticlesComponent id='particles'/> */}
			</div>
		</motion.div>
	);
};

export default Main;
