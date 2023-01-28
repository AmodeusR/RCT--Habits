import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import HabitDay from "./HabitDay";

const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7;
const ammountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type SummaryDate = {
  id: string;
  date: Date;
  amount: number;
  completed: number;
};

const SummaryTable = () => {
  const [summary, setSummary] = useState<SummaryDate[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("summary");
      const data = await response.data;

      setSummary(data);
      
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {daysOfWeek.map((day, i) => (
          <div key={day + i} className="day-style">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((summaryDate) => {
          const dayInSummary = summary.find((summaryDay) =>
            dayjs(summaryDate).isSame(summaryDay.date, "day")
          );

          return (
            <HabitDay
              key={dayInSummary?.id || String(summaryDate)}
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed}
              date={summaryDate}
            />
          );
        })}
        {ammountOfDaysToFill > 0 &&
          Array.from({ length: ammountOfDaysToFill }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          ))}
      </div>
    </div>
  );
};

export default SummaryTable;
