export default function Activity() {

	let contributions = [];

	const s = () => {
		for (let i = 0 ; i < 742 ; i += 14) {
			const g = <g transform={`translate(${i}, 0)`}></g>
			contributions.push(g)
		}
		return contributions
	}

	return (
		<div className="bg-red-200 h-2/5 font-black">
			<h2>Activity</h2>
			<div 
			className="js-calendar-graph mx-md-2 mx-3 d-flex flex-column flex-items-end flex-xl-items-center overflow-hidden pt-1 is-graph-loading graph-canvas ContributionCalendar height-full text-center"
			data-graph-url="/users/tclohm/contributions"
			data-from="2022-01-01 00:00:00 -0800"
			data-to="2022-12-31 23:59:59 -0800"
			>
				<svg className="js-calendar-graph-svg" width="717" height="112">
					<g transform="translate(15, 20)">
						<g transform="translate(0, 0)">
							<rect className="ContributionCalendar-day" width="10" height="10" x="14" y="78" rx="2" ry="2" data-count="0" data-date="2022-01-01" data-level="0"/>
						</g>
					</g>
				</svg>
			</div>
		</div>
	)
}