import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";

export default function DateInput(props) {
  const [click, setClick] = useState("");
  const handleFocus = () => {
    setClick(
      "placeholder-shown:text-sm placeholder-shown:leading-[3.75] placeholder-shown:before:border-transparent placeholder-shown:after:border-transparent focus:text-[13px] focus:leading-tight text-green-600 before:border-t-2 before:border-l-2 before:border-green-600 after:border-t-2 after:border-r-2 after:border-green-600"
    );
  };
  return (
    <div className={`${props.sx}`}>
      <div className="relative h-10 w-full min-w-[200px]">
        <DatePicker
          className={`peer h-full w-full rounded-[7px] border-x border-b px-3 py-2.5 text-sm font-normal transition-all placeholder-shown:border focus:border-2 focus:border-green-600 focus:border-t-transparent focus:outline-0 ${props.error}`}
          onChange={props.onChange}
          selected={props.selected}
          placeholder=" "
          locale={vi}
          dateFormat={
            props.dateFormat ? props.dateFormat : "dd/MM/yyyy hh:mm aa"
          }
          minDate={props.minDate}
          maxDate={props.maxDate}
          showTimeInput
          onFocus={handleFocus}
          onBlur={() => setClick("")}
        />
        <label
          className={`before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[13px] leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t ${
            props.error
              ? "before:border-l-red-500 before:border-t-red-500 after:border-t-red-500"
              : ""
          } after:transition-all ${click ? click : "text-slate-400"} `}
        >
          {props.placeholder}
        </label>
      </div>
    </div>
  );
}
