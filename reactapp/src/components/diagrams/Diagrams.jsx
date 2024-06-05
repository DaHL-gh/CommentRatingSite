import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Label } from "recharts";
import fetchData from "../../utils/fetchData";

const Diagrams = ({ data }) => {
	const [labelVisible, setLabelVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLabelVisible(true);
		}, 2500);

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
				width: 560,
				height: 500,
				outerRadius: "90%",
				innerRadiusmin: "60%",
				innerRadiusmax: "70%",
			};
		}
	};

	const chartDimensions = getChartDimensions();
	const data01 = data
		? [
				{
					name: "К-во положительных комментариев",
					value: data.positive,
					fill: "#4caf50",
				},
				{
					name: "К-во отрицательных комментариев",
					value: data.negative,
					fill: "#FF0000",
				},
				{
					name: "К-во нейтральных комментариев",
					value: data.neutral,
					fill: "#2196f3",
				},
		  ]
		: [];
	const fullprocent = data
		? (
				((data.positive * 1 + data.negative * -1 + data.neutral * 0) /
					data.comments_count) *
				100
		  ).toFixed(2)
		: 0;
	const data02 = data
		? [{ name: "Общее к-во комментариев", value: data.comments_count }]
		: [];

	// Function to determine the color of the label based on the percentage
	const getLabelColor = (percentage) => {
		if (percentage >= 80) return "#00FF00"; // Green
		if (percentage >= 50) return "#ff9800"; // Orange
		return "#FF0000"; // Red
	};
	const labelColor = getLabelColor(fullprocent);

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
