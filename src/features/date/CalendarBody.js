import React from "react";
import moment from "moment";
import Event from "./Event";

// const events = [
//   {
//     title: "Meeting",
//     start: moment("2023-05-05 10:00"),
//     end: moment("2023-05-05 11:00"),
//   },
//   {
//     title: "Lunch",
//     start: moment("2023-05-06 12:00"),
//     end: moment("2023-05-06 13:00"),
//   },
//   {
//     title: "Party",
//     start: moment("2023-05-07 19:00"),
//     end: moment("2023-05-07 23:00"),
//   },
// ];

const CalendarBody = ({ date, events, onDeleteEvent }) => {
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

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>CN</th>
            <th>T2</th>
            <th>T3</th>
            <th>T4</th>
            <th>T5</th>
            <th>T6</th>
            <th>T7</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              {week.map((day) => (
                <td key={day.format("DD-MM-YYYY")}>
                  {day.format("D")}
                  {/* Hiển thị các sự kiện tại ngày này */}
                  {events
                    .filter((event) => {
                      return (
                        event.start.format("DD-MM-YYYY") ===
                        day.format("DD-MM-YYYY")
                      );
                    })
                    .map((event) => {
                      return <Event key={event.title} event={event} />;
                    })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarBody;
