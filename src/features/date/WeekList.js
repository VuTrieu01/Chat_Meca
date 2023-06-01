import React, { useState } from "react";
import moment from "moment";
import TimeTable from "./TimeTable";
import Scrollbar from "../../components/Scrollbar";
import EventForm from "./EventForm";

export default function WeekList({ date, today, getHoliday, dataEvent }) {
  const startDate = date.clone().startOf("week").add(0, "day"); // Bắt đầu từ Thứ hai
  const endDate = date.clone().startOf("week").add(7, "day"); // Kết thúc vào Chủ nhật
  const startHoliday = date.clone().startOf("week").add(0, "day"); // Bắt đầu từ Thứ hai
  const endHoliday = date.clone().startOf("week").add(7, "day"); // Kết thúc vào Chủ nhật
  const [open, setOpen] = useState();
  const openButton = (uid) => {
    setOpen(uid);
  };
  const closeButton = () => {
    setOpen();
  };
  const getDataEvent = (day) => {
    const date = moment(day).format("DD-MM-YYYY");
    return dataEvent.filter((val) =>
      moment(new Date(val.time)).format("DD-MM-YYYY").includes(date)
    );
  };

  const daysOfWeekBlocks = [];
  while (startDate.isBefore(endDate)) {
    const dayOfWeek = startDate.locale("vi").format("dddd");
    daysOfWeekBlocks.push(
      <th
        key={startDate.format("DD-MM-YYYY")}
        className="w-36 h-20 text-gray-600"
      >
        <div className="text-base font-medium">
          {dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}
        </div>
        <div className="flex justify-center">
          <p
            className={`w-11 py-1.5 text-2xl font-medium rounded-full ${
              startDate.format("DD-MM-YYYY") === today.format("DD-MM-YYYY") &&
              "bg-green-500 text-white"
            }`}
          >
            {startDate.format("DD")}
          </p>
        </div>
      </th>
    );
    startDate.add(1, "day");
  }
  const listHoliday = [];
  while (startHoliday.isBefore(endHoliday)) {
    listHoliday.push(
      <td
        key={startHoliday.format("DD-MM-YYYY")}
        className="border border-gray-200 border-b-0 h-24 w-40"
      >
        <Scrollbar height="h-24">
          {getHoliday(startHoliday).map((item, index) => (
            <div key={index}>
              <p className="text-xs bg-blue-500 text-white font-bold p-1 rounded-sm m-1">
                {item.name}
              </p>
            </div>
          ))}
          {getDataEvent(startHoliday).map(
            (item, index) =>
              item.allDay === true && (
                <div key={index}>
                  <p
                    onClick={() => openButton(item.uid)}
                    className={`text-xs font-bold p-1 rounded-sm m-1 cursor-pointer ${
                      item.done === true
                        ? "line-through bg-transparent text-gray-500"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {item.title}
                  </p>
                  {item.uid === open && (
                    <EventForm
                      title="Việc cần làm"
                      open={""}
                      closeButton={closeButton}
                      editEvent
                      deleteItem
                      dataEvent={item}
                    />
                  )}
                </div>
              )
          )}
        </Scrollbar>
      </td>
    );
    startHoliday.add(1, "day");
  }
  return (
    <div className="h-full">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="w-16"></th>
            {daysOfWeekBlocks}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-16 border border-gray-200 border-b-0 h-24 text-gray-600 text-center"></td>
            {listHoliday}
          </tr>
        </tbody>
      </table>
      <Scrollbar height="h-[80%]">
        <table className="table-auto">
          <TimeTable date={date} dataEvent={dataEvent} />
        </table>
      </Scrollbar>
    </div>
  );
}
