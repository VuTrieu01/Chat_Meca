import React from "react";

export default function RadioButton() {
  return (
    <div className="flex w-full gap-10 mb-5">
      <div className="inline-flex items-center">
        <label className="relative flex cursor-pointer items-center rounded-full px-3">
          <input
            name="type"
            type="radio"
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-green-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-green-600 checked:before:bg-green-600 hover:before:opacity-10"
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-green-600 opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
          </div>
        </label>
        <label className="mt-px cursor-pointer select-none font-light">
          Nữ
        </label>
      </div>
      <div className="inline-flex items-center">
        <label className="relative flex cursor-pointer items-center rounded-full px-3">
          <input
            name="type"
            type="radio"
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full text-green-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-green-600 checked:before:bg-green-600 hover:before:opacity-10"
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-green-600 opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
          </div>
        </label>
        <label className="mt-px cursor-pointer select-none font-light ">
          Nam
        </label>
      </div>
    </div>
  );
}
