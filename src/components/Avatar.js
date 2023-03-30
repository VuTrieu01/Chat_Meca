import React from "react";
import { FaUserAlt } from "react-icons/fa";

export default function Avatar(props) {
  return (
    <div className={`${props.sx}`} title={props.title}>
      {props.url ? (
        <img
          className={`inline-block ${
            props.size ? `${props.size}` : " w-12"
          } rounded-full ring-2 ring-white`}
          src={props.url}
          alt=""
        />
      ) : (
        <FaUserAlt
          className={`${
            props.size ? `${props.size}` : "h-10 w-10"
          } rounded-full p-2 text-white bg-gray-400`}
        />
      )}
    </div>
  );
}
