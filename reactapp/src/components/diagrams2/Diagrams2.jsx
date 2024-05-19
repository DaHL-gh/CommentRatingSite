import React from "react";
import { Pie} from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement)
const data = {
	labels: ["Chrome", "Firefox", "Safari", "Edge", "Others"],
	datasets: [
		{
			data: [45, 20, 15, 10, 10],
			backgroundColor: ["blue", "orange", "green", "purple", "gray"],
            marginTop: '50'
		},
	],
};

const Diagrams2 = () => {
	return (
		<div className="diag">
			<Pie  data = {data} />
		</div>
	);
};

export default Diagrams2;
