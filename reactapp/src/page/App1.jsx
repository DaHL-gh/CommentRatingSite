import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
const App = () => {
	return (
		<div>
			<motion.div
				intial={{ opacity: 0 }}
				animate={{ opacity: 0 }}
				exit={{ opacity: 1, transition: { duration: 0.2 } }}
			>
				<Header />
			</motion.div>
      <Footer/>
		</div>
	);
};

export default App;
