import React from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function CalendarLeftHeader({ date, nextMonth, prevMonth }) {
  return (
    <div className="flex mx-2 justify-between">
      <button
        onClick={prevMonth}
        className="text-sm p-1 rounded-full hover:bg-gray-100 mr-1"
      >
        <GrFormPrevious />
      </button>
      <p className="font-bold text-sm">
        Tháng {date.format("MM")} năm {date.format("YYYY")}
      </p>
      <button
        onClick={nextMonth}
        className="text-sm p-1 rounded-full hover:bg-gray-100"
      >
        <GrFormNext />
      </button>
    </div>
  );
}
