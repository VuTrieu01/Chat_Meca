import React from "react";

export default function Button(props) {
  return (
    <button
      type={props.type ? "submit" : "button"}
      className={`middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase bg-blue-500 text-white shadow-md transition-all hover:shadow-lg hover:shadow-blue-700/40 hover:bg-blue-700 ${props.sx}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
