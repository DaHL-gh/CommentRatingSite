import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip } from "recharts";

const Diagrams = () => {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () =>
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Функция для определения размеров графика
	const getChartDimensions = () => {
		if (windowSize.width < 768) {
			return { width: 400, height: 400, outerRadius: "80%" };
		} else {
			return { width: 550, height: 500, outerRadius: "90%" };
		}
	};

	const chartDimensions = getChartDimensions();
	const data01 = [
		{ name: "К-во положительных комментариев", value: 1, fill: "#4caf50" },
		{ name: "К-во отрицательных комментариев", value: 2, fill: "#f44336" },
		{ name: "К-во нейтральных комментариев", value: 55, fill: "#2196f3" },
	];

	return (
		<div className="piechart-container">
			<PieChart
				width={chartDimensions.width}
				height={chartDimensions.height}
			>
				<Pie
					dataKey="value"
					isAnimationActive={true}
					data={data01}
					cx="50%"
					cy="50%"
					outerRadius={chartDimensions.outerRadius}
					fill="#8884d8"
					label
				/>
				<Tooltip />
			</PieChart>
		</div>
	);
};

export default Diagrams;
