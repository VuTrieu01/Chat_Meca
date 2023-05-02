import React, { useState } from "react";
import CalendarLeftBody from "./CalendarLeftBody";
import CalendarLeftHeader from "./CalendarLeftHeader";
import moment from "moment";

export default function CalendarLeft({
  date,
  today,
  nextMonth,
  prevMonth,
  setDate,
}) {
  return (
    <div className="mx-4">
      <CalendarLeftHeader
        date={date}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
      <CalendarLeftBody date={date} today={today} setDate={setDate} />
    </div>
  );
}
