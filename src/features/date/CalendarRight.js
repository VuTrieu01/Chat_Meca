import React, { useEffect } from "react";
import WeekList from "./WeekList";
import { child, ref, update } from "firebase/database";
import { database } from "../../firebase";
import moment from "moment";

export default function CalendarRight({ date, today, getHoliday, dataEvent }) {
  const dbRef = ref(database);
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      dataEvent.map((item) => {
        if (currentTime > new Date(item.time)) {
          if (!moment(currentTime).startOf("day").isSame(moment(item.time))) {
            update(child(dbRef, `Event` + `/${item.uid}`), {
              done: true,
            });
          }
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [dataEvent]);
  return (
    <div>
      <WeekList
        date={date}
        today={today}
        getHoliday={getHoliday}
        dataEvent={dataEvent}
      />
    </div>
  );
}
