import { useState } from "react"
import Calendar from "../components/Calendar"
import ContributionActivity from "../components/ContributionActivity";
import YearButton from "../components/YearButton";

const years = {"2022": true, "2021": false, "2020": false};

function CalendarProfile() {

    const [selectedYear, setSelectedYear] = useState("2022");

    return (
        <div className="App flex flex-col justify-center items-center w-screen">
            <div className="mx-3 flex flex-col items-center overflow-clip pt-1 h-full text-center">
                <Calendar />
                <div className="flex w-screen justify-center">
                    <ContributionActivity />
                    <div className="flex flex-col">
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarProfile