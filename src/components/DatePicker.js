import React from "react";

export default function DatePicker(props) {
  return (
    <div className={`${props.sx}`}>
      <div className="relative h-10 w-full min-w-[200px]">
        <input
          onChange={props.onChange}
          type={props.type}
          className="peer h-full w-full rounded-[7px] border-x border-b px-3 py-2.5 text-sm font-normal transition-all placeholder-shown:border focus:border-2 focus:border-green-600 focus:border-t-transparent focus:outline-0 "
          placeholder=" "
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[13px] text-slate-400 font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[13px] peer-focus:leading-tight peer-focus:text-green-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-600">
          {props.placeholder}
        </label>
      </div>
    </div>
  );
}
