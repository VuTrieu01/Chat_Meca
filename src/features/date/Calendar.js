import React, { useState } from "react";
import moment from "moment";
import CalendarHeader from "./CalendarHeader ";
import CalendarBody from "./CalendarBody";
import EventForm from "./EventForm";
import CalendarLeft from "./CalendarLeft";
import CalendarRight from "./CalendarRight";

const Calendar = () => {
  const [date, setDate] = useState(moment);
  const today = moment();
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);

  const nextMonth = () => {
    setDate(date.clone().add(1, "month"));
  };

  const prevMonth = () => {
    setDate(date.clone().subtract(1, "month"));
  };
  const handleSaveEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
    setShowEventForm(false);
  };

  const handleDeleteEvent = (event) => {
    setEvents((prevEvents) => prevEvents.filter((e) => e !== event));
  };
  return (
    <div className="h-full w-full">
      <CalendarHeader
        date={date}
        setDate={setDate}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
      <div className="h-4/5 w-full flex">
        <CalendarLeft
          date={date}
          today={today}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
          setDate={setDate}
        />
        <CalendarRight date={date} today={today} />
        {/* <CalendarHeader date={date} nextMonth={nextMonth} prevMonth={prevMonth} />
      <CalendarBody
        date={date}
        events={events}
        onDeleteEvent={handleDeleteEvent}
      /> */}
        {/* {showEventForm && (
        <div>
          <EventForm
            date={date}
            onSave={handleSaveEvent}
            onClose={() => setShowEventForm(false)}
          />
        </div>
      )}
      {!showEventForm && (
        <div>
          <button onClick={() => setShowEventForm(true)}>Add Event</button>
        </div>
      )} */}
      </div>
    </div>
  );
};

export default Calendar;
