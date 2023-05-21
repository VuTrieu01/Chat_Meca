import React, { useEffect, useState } from "react";
import moment from "moment";
import CalendarHeader from "./CalendarHeader ";
import CalendarLeft from "./CalendarLeft";
import CalendarRight from "./CalendarRight";
import Holidays from "date-holidays";

const Calendar = () => {
  const [date, setDate] = useState(moment);
  const today = moment();
  const [holidays, setHolidays] = useState([]);

  const nextMonth = () => {
    setDate(date.clone().add(1, "month"));
  };

  const prevMonth = () => {
    setDate(date.clone().subtract(1, "month"));
  };
  useEffect(() => {
    const hd = new Holidays("VN");
    const hdList = hd.getHolidays(date.format("YYYY"));
    const holidayList = Object.keys(hdList).map((key) => {
      const holiday = hdList[key];
      const solarDate = holiday.start;
      return {
        name: holiday.name,
        date: solarDate,
      };
    });
    setHolidays(holidayList);
  }, [date]);
  const getHoliday = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return holidays
      .filter((val) => moment(val.date).format("YYYY-MM-DD") === formattedDate)
      .map((holiday) => holiday);
  };
  return (
    <div className="h-full w-full">
      <CalendarHeader
        date={date}
        setDate={setDate}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
      <div className="h-4/5 w-full flex mt-2">
        <CalendarLeft
          date={date}
          today={today}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
          setDate={setDate}
          getHoliday={getHoliday}
        />
        <CalendarRight date={date} today={today} getHoliday={getHoliday} />
      </div>
    </div>
  );
};

export default Calendar;
