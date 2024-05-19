import React from "react";
import Header from "../components/Header/Header";
import { motion } from "framer-motion";
import Footer from "../components/Footer/Footer";
const Home = () => {
	return (
		<div>
			<motion.div
				intial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 1, transition: { duration: 1 } }}
			>
				<Header/>
			</motion.div>
			<Footer />
		</div>
	);
};

export default Home;
