import React, { useState } from "react";

const EventForm = ({ date, onSave, onClose }) => {
  const [event, setEvent] = useState({
    title: "",
    start: date.clone().startOf("day"),
    end: date.clone().startOf("day").add(1, "hour"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleStartChange = (event) => {
    const start = event.target.value
      ? date
          .clone()
          .set({
            hour: Number(event.target.value.split(":")[0]),
            minute: Number(event.target.value.split(":")[1]),
          })
      : null;
    setEvent((prevEvent) => ({ ...prevEvent, start }));
  };

  const handleEndChange = (event) => {
    const end = event.target.value
      ? date
          .clone()
          .set({
            hour: Number(event.target.value.split(":")[0]),
            minute: Number(event.target.value.split(":")[1]),
          })
      : null;
    setEvent((prevEvent) => ({ ...prevEvent, end }));
  };

  const handleSave = () => {
    onSave(event);
    setEvent({
      title: "",
      start: date.clone().startOf("day"),
      end: date.clone().startOf("day").add(1, "hour"),
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="title"
          value={event.title}
          placeholder="Title"
          onChange={handleChange}
        />
      </div>
      <div>
        Start Time:{" "}
        <input
          type="time"
          name="start"
          value={event.start.format("HH:mm")}
          onChange={handleStartChange}
        />
      </div>
      <div>
        End Time:{" "}
        <input
          type="time"
          name="end"
          value={event.end.format("HH:mm")}
          onChange={handleEndChange}
        />
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EventForm;
