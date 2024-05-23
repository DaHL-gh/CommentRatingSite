import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Label } from "recharts";
import fetchData from "../../utils/fetchData";

const Diagrams = () => {
	const [labelVisible, setLabelVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLabelVisible(true);
		}, 2500); // Set the delay here, 3000ms is 3 seconds

		return () => clearTimeout(timer);
	}, []);

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
			return {
				width: 410,
				height: 400,
				outerRadius: "80%",
				innerRadiusmin: "50%",
				innerRadiusmax: "60%",
			};
		} else {
			return {
				width: 550,
				height: 500,
				outerRadius: "90%",
				innerRadiusmin: "60%",
				innerRadiusmax: "70%",
			};
		}
	};

	const chartDimensions = getChartDimensions();
	const data01 = [
		{ name: "К-во положительных комментариев", value: 1, fill: "#4caf50" },
		{ name: "К-во отрицательных комментариев", value: 2, fill: "#FF0000" },
		{ name: "К-во нейтральных комментариев", value: 55, fill: "#2196f3" },
	];
	const fullprocent = (((58 * 1 + 2 * -1 + 55 * 0) / 58) * 100).toFixed(2);
	const data02 = [{ name: "Общее к-во комментариев", value: 100 }];

	// Function to determine the color of the label based on the percentage
	const getLabelColor = (percentage) => {
		if (percentage >= 80) return "#00FF00"; // Green
		if (percentage >= 50) return "#ff9800"; // Orange
		return "#FF0000"; // Red
	};
	const labelColor = getLabelColor(fullprocent)

	return (
		<div className="piechart-container">
			<PieChart
				width={chartDimensions.width}
				height={chartDimensions.height}
			>
				<Pie
					data={data02}
					dataKey="value"
					cx="50%"
					cy="50%"
					outerRadius={chartDimensions.innerRadiusmin}
					fill="#8884d8"
					stroke="none"
				>
					{labelVisible && (
						<Label
							value={fullprocent + "%"}
							position="center"
							style={{ fill: labelColor, fontSize: 40 }}
						/>
					)}
				</Pie>
				<Pie
					dataKey="value"
					isAnimationActive={true}
					data={data01}
					cx="50%"
					cy="50%"
					innerRadius={chartDimensions.innerRadiusmax}
					outerRadius={chartDimensions.outerRadius}
					fill="#8884d8"
					label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
					stroke="none"
				/>

				<Tooltip />
			</PieChart>
		</div>
	);
};

export default Diagrams;
