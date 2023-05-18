import React, { useState } from "react";
import moment from "moment";

import TimeTable from "./TimeTable";
import Scrollbar from "../../components/Scrollbar";

export default function WeekList({ date, today }) {
  const [selectedDate, setSelectedDate] = useState(today.format("dddd"));
  const startDate = date.clone().startOf("week").add(0, "day"); // Bắt đầu từ Thứ hai
  const endDate = date.clone().startOf("week").add(7, "day"); // Kết thúc vào Chủ nhật

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const timeBlocks = [];
  for (let i = 0; i < 24; i++) {
    const time = moment().set({ hour: i, minute: 0, second: 0 });
    timeBlocks.push(
      <div key={time.format("HH:mm")} className="time-block">
        {time.format("h:mm A")}
      </div>
    );
  }

  const daysOfWeekBlocks = [];
  while (startDate.isBefore(endDate)) {
    const dayOfWeek = startDate.locale("vi").format("dddd");
    daysOfWeekBlocks.push(
      <th
        key={startDate.format("DD-MM-YYYY")}
        className="w-36 h-20 text-base text-gray-500 font-medium"
      >
        <div>{dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}</div>
        <div className="flex justify-center">
          <p
            className={`w-10 py-1.5 text-xl font-medium cursor-pointer rounded-full ${
              startDate.format("DD-MM-YYYY") === today.format("DD-MM-YYYY")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {startDate.format("DD")}
          </p>
        </div>
      </th>
    );
    startDate.add(1, "day");
  }
  return (
    <div className="h-full">
      <table className="table-auto">
        <thead>
          <tr>
            <th className=" w-16"></th>
            {daysOfWeekBlocks}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-200 border-b-0 h-24 w-16 text-gray-600 text-center"></td>
            <td className="border border-gray-200 border-b-0 h-24 w-40"></td>
            <td className="border border-gray-200 border-b-0 h-24 w-40"></td>
            <td className="border border-gray-200 border-b-0 h-24 w-40"></td>
            <td className="border border-gray-200 border-b-0 h-24 w-40"></td>
            <td className="border border-gray-200 border-b-0 h-24 w-40"></td>
            <td className="border border-gray-200 border-b-0 h-24 w-40"></td>
            <td className="border border-gray-200 border-b-0 h-24 w-40"></td>
          </tr>
        </tbody>
      </table>
      <Scrollbar height="h-[82%]">
        <table className="table-auto">
          <TimeTable />
        </table>
      </Scrollbar>
    </div>
  );
}
