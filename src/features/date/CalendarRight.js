import React from "react";
import WeekList from "./WeekList";

export default function CalendarRight({ date, today, getHoliday }) {
  return (
    <div>
      <WeekList date={date} today={today} getHoliday={getHoliday} />
    </div>
  );
}
