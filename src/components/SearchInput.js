import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchInput(props) {
  return (
    <div className={`relative ${props.sx}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400 cursor-pointer">
        <AiOutlineSearch />
      </div>
      <input
        onChange={props.onChange} 
        value={props.value} 
        name={props.name}
        type="search"
        className="block w-full p-3 pl-10 text-sm rounded-lg bg-white border-2 border-gray-100 bg-gray-100 focus:border-2 focus:border-green-600 focus:outline-0"
        placeholder={`${props.placeholder ? props.placeholder : "Tìm kiếm"}`}
      />
    </div>
  );
}
