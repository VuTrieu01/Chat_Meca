import React from "react";
import { LunarDate } from "vietnamese-lunar-calendar";
import { GoPrimitiveDot } from "react-icons/go";
import moment from "moment";

export default function CalendarLeftBody({
  date,
  today,
  setDate,
  getHoliday,
  dataEvent,
}) {
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
  const getDataEvent = (day) => {
    const date = moment(day).format("DD-MM-YYYY");
    return dataEvent.filter((val) =>
      moment(new Date(val.time)).format("DD-MM-YYYY").includes(date)
    );
  };
  return (
    <div className="mt-2">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-2 text-xs">T2</th>
            <th className="px-2 text-xs">T3</th>
            <th className="px-2 text-xs">T4</th>
            <th className="px-2 text-xs">T5</th>
            <th className="px-2 text-xs">T6</th>
            <th className="px-2 text-xs">T7</th>
            <th className="px-2 text-xs">CN</th>
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
                    className={`w-6 py-1 text-xs font-semibold cursor-pointer rounded-full ${
                      day.format("DD-MM-YYYY") === today.format("DD-MM-YYYY")
                        ? "bg-green-500 text-white"
                        : "hover:bg-gray-100"
                    } ${
                      day.format("MM") !== date.format("MM") && "text-gray-400 "
                    }`}
                  >
                    {day.format("D")}
                  </div>
                  <div
                    className={`w-6 text-xs  ${
                      day.format("MM") !== date.format("MM")
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {getLunarDate(day)}
                  </div>
                  {getHoliday(day).length > 0 ||
                  getDataEvent(day).length > 0 ? (
                    <div className="text-green-600 text-xs w-6 flex items-center justify-center">
                      <GoPrimitiveDot />
                    </div>
                  ) : (
                    <div className="text-white text-xs">
                      <GoPrimitiveDot />
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
