import React, { useState } from "react";
import moment from "moment";

const TimeTable = () => {
  const startDate = moment().startOf("week").add(1, "day"); // Bắt đầu từ Thứ hai
  const endDate = moment().startOf("week").add(7, "day"); // Kết thúc vào Chủ nhật

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
    const dayOfWeek = startDate.format("dddd");
    daysOfWeekBlocks.push(
      <div key={startDate.format("DD-MM-YYYY")} className="day-of-week">
        {dayOfWeek} {startDate.format("DD")}
      </div>
    );
    startDate.add(1, "day");
  }

  return (
    <div className="calendar">
      <div className="day-of-week-row">{daysOfWeekBlocks}</div>
      <div className="time-column">{timeBlocks}</div>
    </div>
  );
};

export default TimeTable;
