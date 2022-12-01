import { memo, useState, useEffect, useContext } from "react"
import { DateContext } from "../context/DateContext"

import { useWindowSize } from "../useWindowSize"

//  const months = [
//     {"Jan": 65},
//     {"Feb": 52},
//     {"Mar": 52},
//     {"Apr": 52},
//     {"May": 65},
//     {"Jun": 52},
//     {"Jul": 65},
//     {"Aug": 52},
//     {"Sep": 52},
//     {"Oct": 52},
//     {"Nov": 52},
//     {"Dec": 52},
// ]

// const timeDiff = future.getTime() - past.getTime()
// const daysDiff = timeDiff / (1000 * 3600 * 24)

// reviews.map(review => {
//     let color;
//     const count = reviews.filter(r => r.created_at.slice(0, 10) == review.created_at.slice(0, 10)).length 

//     if (count == 1) {
//         color = 'lightyellow'
//     } else if (1 < count && count < 3) {
//         color = 'orange'
//     } else if (3 < count) {
//         color = 'red'
//     } else {
//         color = 'lightgray'
//     }


//     return {
//         date: review.created_at.slice(0, 10),
//         color
//     }
// })

const Calendar = () => {

    const scrollElement = document.getElementById("h-scroll")

    const { future, past, setHoveredDate, setState, setInfo } = useContext(DateContext)
    const [dates, setDates] = useState([])
    const [monthsPosition, setMonthsPosition] = useState([])
    const [reviewed, setReviewed] = useState([])
    const [color, setColor] = useState('')

    const { width } = useWindowSize()

	const nextDay = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    }

    useEffect(() => {
        if (width < 787) {
            scrollElement.scrollTo(1000, 0)
        }
    }, [width, scrollElement])

    const prevSunday = (date) => {
        if (date.getDay() === 6) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        } else {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay())
        }
    }

    // const futureSunday = (date) => {
    //     return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay())
    // }


    useEffect(() => {
        fetch("http://localhost:4000/v1/reviews")
        .then(res => res.json())
        .then(data => {
            const { reviews } = data
            setReviewed(reviews.map(r => r.created_at.slice(0, 10)))
        })
    }, [])

    useEffect(() => {

        const months = [
            {"Jan": 0},
            {"Feb": 0},
            {"Mar": 0},
            {"Apr": 0},
            {"May": 0},
            {"Jun": 0},
            {"Jul": 0},
            {"Aug": 0},
            {"Sep": 0},
            {"Oct": 0},
            {"Nov": 0},
            {"Dec": 0},
        ]

        let monthIndex = future.getMonth()
        // if (monthIndex === 11) {
        //     monthIndex = 0
        // }

        const head = months.slice(monthIndex, months.length)
        const tail = months.slice(0, monthIndex)
        
        const monthsPosition = [...head, ...tail]
        let pointer = 0

        let dt = [];
        let date = prevSunday(past)
        let d = [];
        let index = 30;

        for (let i = 0; i < 371; i++) {

            const datestring = date.toISOString().slice(0, 10)

            if (datestring.slice(8,10) === "01") {

                const date = new Date(datestring).toUTCString().slice(8,11)

                if (future.toUTCString().slice(8,11) === date) {
                    // MARK: -- layout for months above grid

                    const fullMonth = new Date(future.getFullYear(), future.getMonth(), 0).getDate()
                    const daysLeft = fullMonth - future.getDate()
                    index += 10

                    console.log(date, fullMonth, daysLeft, index)
                }  else {
                    index += 52
                }
                
                // MARK: -- pointer for monthsPosition
                if (date === future.toUTCString().slice(8, 11) && future.getDate() >= 1 && future.getDate() <= 6) {
                    monthsPosition[pointer][date] = 695
                } else {
                    monthsPosition[pointer][date] = index
                }
                
                if (pointer > 10) {
                    pointer = 0
                } else {
                    pointer++
                }


            }
            // MARK: -- seven days per week
            if (i % 7 === 0 && d.length !== 0) {

                dt = [...dt, d]
                d = []

            }

            if (datestring === future.toISOString().slice(0, 10)) {

                d = [...d, datestring]
                break

            }

            d = [...d, datestring]
            date = nextDay(date)
        }
        dt = [...dt, d]

        // MARK: -- state
        setDates(dt)
        setMonthsPosition(monthsPosition)
    }, [future, past])
	
	const onHover = (e) => {
        e.preventDefault()
        setColor(e.target.style.fill)
        e.target.style.fill = "orange"
        setHoveredDate(e.target.attributes["data-date"].value)
    }

    const onLeave = (e) => {
        e.preventDefault()
        e.target.style.fill = color
    }

    const onClick = async (e) => {
        e.preventDefault()
        const d = e.target.attributes["data-date"].value
        const date = new Date(d)
        const from = date.toISOString().slice(0,10)
        const to = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1).toISOString().slice(0,10)

        await fetch(`http://localhost:4000/v1/reviews/from=${from}T00:00:00.000Z-to=${to}T00:00:00.000Z`)
        .then(res => res.json())
        .then(data => {
            setState("🦆🦆🦆")
            setInfo(data.reviews)
        })
        .then(() => {
             setState("🔌...✅")
        })
        .catch(e => {
            console.log(e)
            setState("🔌...😖")
        })
    }

	return (
		<div id="h-scroll" className="flex flex-col items-center overflow-hidden md:w-full overflow-x-auto w-96 object-right no-scrollbar">
    		<div className="relative p-4 border rounded">
                <svg width="730" height="112">
                    <g transform="translate(15, 20)">
                        {dates.map((date, i) => (
                            <g className="flex-none" key={i} transform={`translate(${i*14}, 0)`}>
                                {date.map((d, x) => (
                                    (reviewed.includes(d) ?
                                        <rect key={x} width="10" height="10" x={14-i+1} y={x*13} rx="2" ry="2" data-date={new Date(d).toUTCString().slice(0, 17)} style={{"fill": "tomato"}} onMouseEnter={e => onHover(e)} onMouseLeave={e => onLeave(e)} onClick={e => onClick(e)}></rect>
                                    :
                                        <rect key={x} width="10" height="10" x={14-i+1} y={x*13} rx="2" ry="2" data-date={new Date(d).toUTCString().slice(0, 17)} style={{"fill": "lightgray"}} onMouseEnter={e => onHover(e)} onMouseLeave={e => onLeave(e)}></rect>
                                    )
                                ))}
                            </g>
                        ))}
                    </g>
        	        {monthsPosition.map((object, i) => (

        	            <text key={i} x={Object.values(object)[0]} y="10" className="text-xs">{Object.keys(object)[0]}</text>

        	        ))}
        	        <text key="13" x={monthsPosition.length > 0 ? Object.values(monthsPosition[0])[0] - 675 : ""} y="10" className="text-xs">{monthsPosition.length > 0 ? Object.keys(monthsPosition[0])[0] : ""}</text>
        	        <text textAnchor="start" className="text-xs" dx="-15" dy="8" style={{display: "none"}}>Sun</text>
        	        <text textAnchor="start" className="text-xs" dx="2" dy="42">Mon</text>
        	        <text textAnchor="start" className="text-xs" dx="-15" dy="32" style={{display: "none"}}>Tue</text>
        	        <text textAnchor="start" className="text-xs" dx="2" dy="68">Wed</text>
        	        <text textAnchor="start" className="text-xs" dx="-15" dy="57" style={{display: "none"}}>Thu</text>
        	        <text textAnchor="start" className="text-xs" dx="2" dy="94">Fri</text>
        	        <text textAnchor="start" className="text-xs" dx="-15" dy="81" style={{display: "none"}}>Sat</text>
        	    </svg>
                <h2 className="absolute right-0 font-extralight text-black ml-8 text-xs">{past.toISOString().slice(0, 4)} - {future.toISOString().slice(0, 4)}</h2>
            </div>
	    </div>
	)
}

export default memo(Calendar);