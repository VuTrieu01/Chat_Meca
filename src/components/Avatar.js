import React from "react";
import { FaUserAlt } from "react-icons/fa";

export default function Avatar(props) {
  return (
    <div className={`${props.sx}`} title={props.title} onClick={props.onClick}>
      {props.url ? (
        <div className={`rounded-full ${props.size && props.size}`}>
          <img
            className={`inline-block rounded-full ${
              props.size ? `${props.size}` : "w-12"
            } "w-12" ring-2 ring-white`}
            src={props.url}
            alt=""
          />
        </div>
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
