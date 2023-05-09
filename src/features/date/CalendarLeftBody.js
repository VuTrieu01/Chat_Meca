import React from "react";
import { LunarDate } from "vietnamese-lunar-calendar";

export default function CalendarLeftBody({ date, today, setDate }) {
  const startOfMonth = date.clone().startOf("month");
  const endOfMonth = date.clone().endOf("month");
  const startOfWeek = startOfMonth.clone().startOf("week");
  const endOfWeek = endOfMonth.clone().endOf("week");

  const weeks = [];
  let days = [];
  let day = startOfWeek;

  while (day <= endOfWeek) {
    for (let i = 0; i < 7; i++) {
      days.push(day.clone());
      day.add(1, "day");
    }
    weeks.push(days);
    days = [];
  }

  const getLunarDate = (day) => {
    const days = Number(day.format("DD"));
    const months = Number(day.format("MM"));
    const years = Number(day.format("YYYY"));
    const lunarDate = new LunarDate(years, months, days);
    if (lunarDate.date === 1) {
      return lunarDate.date + "/" + lunarDate.month;
    }
    return lunarDate.date;
  };

  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-2 py-1 text-xs">CN</th>
            <th className="px-2 py-1 text-xs">T2</th>
            <th className="px-2 py-1 text-xs">T4</th>
            <th className="px-2 py-1 text-xs">T5</th>
            <th className="px-2 py-1 text-xs">T3</th>
            <th className="px-2 py-1 text-xs">T6</th>
            <th className="px-2 py-1 text-xs">T7</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              {week.map((day) => (
                <td
                  key={day.format("DD-MM-YYYY")}
                  onClick={() => setDate(day)}
                  className="text-center"
                >
                  <div
                    className={`px-2 py-1.5 text-sm font-medium cursor-pointer rounded-full ${
                      day.format("DD-MM-YYYY") === today.format("DD-MM-YYYY")
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                    } ${
                      day.format("MM") !== date.format("MM") && "text-gray-400 "
                    }`}
                  >
                    {day.format("D")}
                  </div>
                  <div
                    className={`text-xs  ${
                      day.format("MM") !== date.format("MM")
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {getLunarDate(day)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
