import React from "react";

const CalendarHeader = ({ date, nextMonth, prevMonth }) => {
  return (
    <div className="flex border-gray-100 border-b-2 py-5 mb-2">
      <div className="mx-5">
        <p className="font-bold text-2xl">Lịch</p>
      </div>
      {/* <button onClick={prevMonth}>Previous</button>
      <h2>Tháng {date.format("MM YYYY")}</h2>
      <button onClick={nextMonth}>Next</button> */}
    </div>
  );
};

export default CalendarHeader;
