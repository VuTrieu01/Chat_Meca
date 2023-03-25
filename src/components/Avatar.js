import React from "react";
import { FaUserAlt } from "react-icons/fa";

export default function Avatar(props) {
  return (
    <div className={`${props.sx}`}>
      {props.url ? (
        <img
          className={`inline-block ${
            props.size ? `h-${props.size} w-${props.size}` : "h-10 w-10"
          } rounded-full ring-2 ring-white`}
          src={props.url}
          alt=""
        />
      ) : (
        <FaUserAlt
          className={`inline-block ${
            props.size ? `h-${props.size} w-${props.size}` : "h-10 w-10"
          } rounded-full ring-2 p-2 ring-white text-white bg-gray-400`}
        />
      )}
    </div>
  );
}
