import React from "react";
import Avatar from "../../components/Avatar";
import Ping from "../../components/Ping";

export default function ChatItem(props) {
  return (
    <div
      className={`w-full px-5 py-4 cursor-pointer ${
        props.click ? "bg-green-100" : "bg-white hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center">
        <div className="flex items-end">
          <Avatar url={props.url} />
          {props.active ? (
            <Ping sx="right-3" />
          ) : (
            <div className="h-3 w-3"></div>
          )}
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="mr-4">
            <div className="font-bold">{props.name}</div>
            {props.newChat ? (
              <div className="w-36 font-bold text-green-600 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                Hẹn gặp 8 giờ nhé
              </div>
            ) : (
              <div className="w-36 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                {props.test}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end">
            <div className="text-gray-400 text-sm">{props.time}</div>
            {props.newChat ? (
              <div className="flex items-center justify-center h-5 w-5 p-2 bg-red-600 text-white font-bold rounded-full text-xs">
                1
              </div>
            ) : (
              <div className="h-5 w-5 p-2" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
