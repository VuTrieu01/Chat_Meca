import React, { useState } from "react";
import Button from "../../components/Button";
import moment from "moment";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import EventForm from "./EventForm";

const CalendarHeader = ({ date, setDate }) => {
  const [open, setOpen] = useState("hidden");
  const nextMonth = () => {
    setDate(date.clone().add(1, "week"));
  };
  const prevMonth = () => {
    setDate(date.clone().subtract(1, "week"));
  };
  const openButton = () => {
    setOpen("");
  };
  const closeButton = () => {
    setOpen("hidden");
  };
  return (
    <div className="flex items-center justify-between border-gray-100 border-b-2 p-5">
      <div className="mr-48">
        <p className="font-bold text-2xl">Lịch</p>
      </div>
      <div className="flex items-center w-[72%]">
        <Button
          sx="mr-2 bg-green-500 hover:bg-green-600 p-1"
          onClick={() => setDate(moment())}
        >
          Hôm nay
        </Button>
        <button
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100 mr-1 text-2xl"
        >
          <GrFormPrevious />
        </button>
        <button
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100 mr-1 text-2xl"
        >
          <GrFormNext />
        </button>
        <p className="text-xl font-medium">Tháng {date.format("MM YYYY")}</p>
      </div>
      <Button
        sx="mr-2 bg-green-500 hover:bg-green-600 p-1"
        onClick={openButton}
      >
        +
      </Button>
      <EventForm
        title="Tạo việc cần làm"
        open={open}
        closeButton={closeButton}
        save
      />
    </div>
  );
};

export default CalendarHeader;
