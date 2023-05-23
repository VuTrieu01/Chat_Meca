import React from "react";

export default function CheckBox(props) {
  return (
    <div className="flex items-center pr-3">
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        className="w-4 h-4 text-blue-600 bg-green-100 border-green-300 rounded focus:ring-blue-500"
      />
      <label className="w-full py-3 ml-2 text-sm text-gray-500 dark:text-gray-300">
        {props.title ? props.title : "Cả ngày"}
      </label>
    </div>
  );
}
