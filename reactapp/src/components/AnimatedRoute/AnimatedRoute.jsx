import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './../../page/Home'
import App1 from './../../page/App1'
import { AnimatePresence } from "framer-motion";
const AnimatedRoute = () => {
	const location = useLocation();
	return (
		<div>
			<AnimatePresence>
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Home />} />
					<Route path="/app" element={<App1 />} />
				</Routes>
			</AnimatePresence>
		</div>
	);
};

export default AnimatedRoute;
