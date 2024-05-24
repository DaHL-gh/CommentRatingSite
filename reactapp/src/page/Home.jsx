import React from "react";
import Header from "../components/Header/Header";
import { motion } from "framer-motion";
import Footer from "../components/Footer/Footer";
import ParticlesComponent from "../components/Particles/particles";
const Home = () => {
	return (
		<div>
			<motion.div
				intial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 1, transition: { duration: 1 } }}
			>
				{/* <ParticlesComponent id='particles'/> */}
				<Header />
			</motion.div>
			<Footer />
		</div>
	);
};

export default Home;
