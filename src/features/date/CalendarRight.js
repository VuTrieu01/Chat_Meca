import React from "react";
import WeekList from "./WeekList";

export default function CalendarRight({ date, today }) {
  return (
    <div>
      <WeekList date={date} today={today} />
    </div>
  );
}
