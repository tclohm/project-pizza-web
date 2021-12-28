import * as d3 from "d3";

export default function drawChart(element, data) {
	const colors = ["gold", "lightpink", "crimson", "snow", "firebrick"]
	const boxSize = 500;

	d3.select(element).select("svg").remove()

	const svg = d3
				.select(element)
				.append("svg")
				.attr("preserveAspectRatio", "xMidYMid meet")
				.attr("height", "100%")
				.attr("width", "100%")
				.attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
				.append("g")
				.attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`)

	const arcGenerator = d3.arc()
							.cornerRadius(10)
							.padAngle(0.07)
							.innerRadius(100)
							.outerRadius(250);

	const pieGenerator = d3.pie().value(d => d.value);

	const arcs = svg.selectAll().data(pieGenerator(data)).enter();
	arcs
		.append("path")
		.attr("d", arcGenerator)
		.style("stroke", "#000")
		.style("fill", (d, i) => colors[i % data.length])
		.transition()
		.duration(700)
		.attrTween("d", function (d) {
			const i = d3.interpolate(d.startAngle, d.endAngle);
			return function (t) {
				d.endAngle = i(t);
				return arcGenerator(d)
			}
		})

	arcs.append("text")
		.attr("text-anchor", "middle")
		.text(d => `${d.data.value} ${d.data.emoji}`)
		.style("fill", "#000")
		.style("font-size", "1px")
		.style("font-family", "Bubblegum Sans")
		.attr("transform", d => {
			const [x, y] = arcGenerator.centroid(d);
			return `translate(${x}, ${y})`;
		})
		.style("font-size", 0)
		.transition()
		.duration(700)
		.style("font-size", "2.6rem")
};