import React, { useState, useEffect } from "react";
import "./App.css";
import "./styles/main.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./page/Home";
import App1 from "./page/App1";
import RiseLoader from "react-spinners/RiseLoader";
import AnimatedRoute from "./components/AnimatedRoute/AnimatedRoute";
import ScrollToTop from "./utils/scrollToTop";
import { motion } from "framer-motion";
function App() {
	const [loading, setLoading] = useState(false);
	let [color, setColor] = useState("#5c62ec");

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);
	const loaderStyle = {
		position: "fixed", 
		top: "0", 
		left: "0", 
		width: "100%",
		height: "100%", 
		backgroundColor: "#171718", 
		display: "flex", 
		justifyContent: "center", 
		alignItems: "center",
		zIndex: "1000", 
	};

	return (
		<motion.div
			className="App"
			initial={{ opacity: 1 }}
			animate={{ opacity: loading ? 0 : 1 }}
			exit={{ opacity: 1 }}
			transition={{ duration: 2.5}} // Установите продолжительность анимации
		>
			{loading ? (
				<div style={loaderStyle}>
					<RiseLoader
						color={color}
						loading={loading}
						size={60}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			) : (
				<Router>
					<ScrollToTop />
					<Navbar />
					<AnimatedRoute />
				</Router>
			)}
		</motion.div>
	);
}

export default App;
