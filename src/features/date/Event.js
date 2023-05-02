import React from "react";

const Event = ({ event }) => {
  return (
    <div>
      <div>{event.title}</div>
      <div>
        {event.start.format("HH:mm")} - {event.end.format("HH:mm")}
      </div>
    </div>
  );
};

export default Event;
