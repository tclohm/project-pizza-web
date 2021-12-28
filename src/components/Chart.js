import React, { useEffect, useRef } from "react";
import drawChart from "../helpers/drawChart";

export default function DonutChart({ data }) {
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) {
			drawChart(ref.current, data)
		}
	}, [ref])


	return (
		<div className="container h-28 w-28">
			<div className="graph" ref={ref} />
		</div>
	);
};