import React, { useState, useEffect } from "react";
import Holidays from "date-holidays";
import { LunarDate } from "vietnamese-lunar-calendar";
import moment from "moment";

export default function DatePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    const hd = new Holidays("VN");
    const hdList = hd.getHolidays(selectedDate.getFullYear());
    const holidayList = Object.keys(hdList).map((key) => {
      const holiday = hdList[key];
      const solarDate = holiday.start;
      return {
        name: holiday.name,
        date: solarDate,
      };
    });
    setHolidays(holidayList);
  }, [selectedDate]);

  const getHolidayName = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return holidays
      .filter((val) => moment(val.date).format("YYYY-MM-DD") === formattedDate)
      .map((holiday) => holiday.name);
  };

  const getLunarDate = (date) => {
    const lunarDate = new LunarDate(date);
    return lunarDate.date + "/" + lunarDate.month;
  };

  const getCalendar = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const calendar = [];
    let week = [];

    while (startDate <= endDate) {
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
      week.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    if (week.length) {
      calendar.push(week);
    }

    return calendar;
  };

  return (
    <div>
      <h1>
        Lịch Tháng {selectedDate.getMonth() + 1} - {selectedDate.getFullYear()}
      </h1>
      <div>
        <button
          onClick={() =>
            handleDateClick(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() - 1,
                1
              )
            )
          }
        >
          Prev
        </button>
        <button
          onClick={() =>
            handleDateClick(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                1
              )
            )
          }
        >
          Next
        </button>
      </div>
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
          {getCalendar(selectedDate).map((week, index) => (
            <tr key={index}>
              {week.map((date, index) => (
                <td key={index} onClick={() => handleDateClick(date)}>
                  <div>
                    <div>{date.getDate()}</div>
                    <div>{getHolidayName(date)}</div>
                    <div>{getLunarDate(date)}</div>
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
