import React from "react";
import moment from "moment";
import "moment/locale/vi";

const TimeTable = ({ dayOfWeek }) => {
  const startDate = moment().startOf("week").add(0, "day"); // Bắt đầu từ Thứ hai
  const endDate = moment().startOf("week").add(7, "day"); // Kết thúc vào Chủ nhật
  const daysOfWeekBlocks = [];
  while (startDate.isBefore(endDate)) {
    const dayOfWeek = startDate.format("dddd");
    daysOfWeekBlocks.push(
      <td
        key={startDate.format("DD-MM-YYYY")}
        className="border border-gray-200 h-24 w-40"
      ></td>
    );
    startDate.add(1, "day");
  }

  const timeBlocks = [];
  for (let i = 0; i < 24; i++) {
    const time = moment().set({ hour: i, minute: 0, second: 0 });
    timeBlocks.push(
      <tr key={time.format("HH:mm")}>
        <td className="w-16 border border-gray-200 border-r-0 text-xs text-gray-600 text-center">
          {time.format("H:mm")}
        </td>
        {daysOfWeekBlocks}
      </tr>
    );
  }

  return <tbody>{timeBlocks}</tbody>;
};

export default TimeTable;
