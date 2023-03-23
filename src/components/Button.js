import React from "react";

export default function Button(props) {
  return (
    <button
      type="button"
      className={`middle none center ${props.sx} rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase bg-blue-500 text-white shadow-md transition-all hover:shadow-lg hover:shadow-blue-700/40 hover:bg-blue-700 `}
    >
      {props.children}
    </button>
  );
}
