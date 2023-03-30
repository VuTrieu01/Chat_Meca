import React from "react";
import Avatar from "../../components/Avatar";

export default function ChatContent(props) {
  return (
    <div className="m-4">
      {props.type ? (
        <div className="flex justify-end ml-14">
          <div
            title="09:12"
            className="bg-green-500 text-white py-2 px-4 rounded-3xl"
          >
            {props.content}
          </div>
        </div>
      ) : (
        <div className="flex">
          <Avatar />
          <div
            title="09:12"
            className="bg-gray-200 text-black py-2 px-4 rounded-3xl ml-3 mr-14"
          >
            {props.content}
          </div>
        </div>
      )}
    </div>
  );
}
