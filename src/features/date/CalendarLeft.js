import React from "react";
import CalendarLeftBody from "./CalendarLeftBody";
import CalendarLeftHeader from "./CalendarLeftHeader";

export default function CalendarLeft({
  date,
  today,
  nextMonth,
  prevMonth,
  setDate,
  getHoliday,
}) {
  return (
    <div className="mx-4">
      <CalendarLeftHeader
        date={date}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
      <CalendarLeftBody
        date={date}
        today={today}
        setDate={setDate}
        getHoliday={getHoliday}
      />
    </div>
  );
}
