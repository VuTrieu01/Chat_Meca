import React from "react";
import moment from "moment";

const TimeTable = () => {
  // Tạo mảng thời gian từ 1h đến 24h với khoảng cách là 30 phút
  const times = [];
  const startTime = moment().startOf("day");
  for (let i = 0; i < 24; i++) {
    times.push(startTime.add(60, "minutes").format("HH:mm"));
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Event</th>
        </tr>
      </thead>
      <tbody>
        {times.map((time) => (
          <tr key={time}>
            <td>{time}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimeTable;
