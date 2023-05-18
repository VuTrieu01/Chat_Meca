import React from "react";
import Button from "../../components/Button";
import moment from "moment";

const CalendarHeader = ({ date, setDate }) => {
  const nextMonth = () => {
    setDate(date.clone().add(1, "week"));
  };

  const prevMonth = () => {
    setDate(date.clone().subtract(1, "week"));
  };
  return (
    <div className="col-span-12 flex border-gray-100 border-b-2 py-5 mb-2">
      <div className="mx-5">
        <p className="font-bold text-2xl">Lịch</p>
      </div>
      <Button
        sx="mr-2 bg-green-500 hover:bg-green-600"
        onClick={() => setDate(moment())}
      >
        Hôm nay
      </Button>
      <button onClick={prevMonth}>Previous</button>
      <h2>Tháng {date.format("MM YYYY")}</h2>
      <button onClick={nextMonth}>Next</button>
    </div>
  );
};

export default CalendarHeader;
