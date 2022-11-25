import "./App.css"
import { useState } from "react"
import Calendar from "./Calendar"
import ContributionActivity from "./ContributionActivity";
import YearButton from "./YearButton";

const years = {"2022": true, "2021": false, "2020": false};

function App() {

    const [selectedYear, setSelectedYear] = useState("2022");

    return (
        <div className="App flex flex-col justify-center items-center w-screen">
            <div className="mx-3 flex flex-col items-end md:items-center overflow-clip pt-1 ContributionCalendar h-full text-center">
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

export default App