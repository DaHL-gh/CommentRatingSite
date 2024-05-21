import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/main";
import ParticlesComponent from "../components/Particles/particles";
const App = () => {
	return (
		<div>
			<motion.div
				intial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { duration: 0.2 } }}
			>
				{/* <ParticlesComponent id='particles'/> */}
				{/* <Header /> */}
			</motion.div>
			<Main/>
			<Footer/>
		</div>
	);
};

export default App;
