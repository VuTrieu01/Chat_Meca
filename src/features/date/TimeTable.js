import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi";
import Scrollbar from "../../components/Scrollbar";
import { TiDeleteOutline } from "react-icons/ti";
import EventForm from "./EventForm";

const TimeTable = ({ date, dataEvent }) => {
  const [open, setOpen] = useState("hidden");
  const [dateTable, setDateTable] = useState([]);
  const getDataEvent = (time, day) => {
    const dates = moment(day).format("DD-MM-YYYY");
    const times = time.map((item) => dates + " " + item.format("H:mm"));
    return dataEvent.filter(
      (val) =>
        val.allDay === false &&
        times.includes(moment(new Date(val.time)).format("DD-MM-YYYY H:mm"))
    );
  };
  const openButton = () => {
    setOpen("");
  };
  const closeButton = () => {
    setOpen("hidden");
  };
  useEffect(() => {
    const newDate = [];
    for (let i = 0; i < 24; i++) {
      const time = moment().set({ hour: i, minute: 0, second: 0 });
      const minute = [];
      for (let j = 0; j < 60; j++) {
        minute[j] = moment().set({ hour: i, minute: j, second: 0 });
      }
      const week = [];
      for (let k = 0; k < 7; k++) {
        week[k] = date.clone().startOf("week").add(k, "day");
      }
      newDate.push({ time, minute, week });
    }
    setDateTable(newDate);
  }, [date]);
  return (
    <tbody>
      {dateTable.map((items, index) => (
        <tr key={index}>
          <td className="w-16 border border-gray-200 border-r-0 text-xs text-gray-600 text-center">
            {items.time.format("H:mm")}
          </td>
          {items.week.map((itemWeek, index) => (
            <td key={index} className="border border-gray-200 h-24 w-40">
              <Scrollbar height="h-24">
                {getDataEvent(items.minute, itemWeek).map(
                  (item, index) =>
                    item.allDay === false && (
                      <div key={index}>
                        <p
                          onClick={openButton}
                          className="text-xs bg-green-500 text-white font-bold p-1 rounded-sm m-1 cursor-pointer"
                        >
                          {item.title}
                        </p>
                        <EventForm
                          title="Việc cần làm"
                          open={open}
                          closeButton={closeButton}
                          edit
                          deleteItem
                        />
                      </div>
                    )
                )}
              </Scrollbar>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TimeTable;
