export default function Activity() {

	const squares = document.querySelector('.squares');
	for (var i = 1; i < 365; i++) {
	  const level = Math.floor(Math.random() * 3);  
	  squares.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);
	}

	
	return (
		<div className="bg-red-200 h-2/5 font-black">
			<h2>Activity</h2>
			<div className="graph">
				<ul className="months">
				<li>Jan</li>
				<li>Feb</li>
				<li>Mar</li>
				<li>Apr</li>
				<li>May</li>
				<li>Jun</li>
				<li>Jul</li>
				<li>Aug</li>
				<li>Sep</li>
				<li>Oct</li>
				<li>Nov</li>
				<li>Dec</li>
				</ul>
				<ul className="days">
				<li>Sun</li>
				<li>Mon</li>
				<li>Tue</li>
				<li>Wed</li>
				<li>Thu</li>
				<li>Fri</li>
				<li>Sat</li>
				</ul>
				<ul className="squares">
				</ul>
			</div>
		</div>
	)
}