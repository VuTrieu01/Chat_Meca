import React from "react";
import Avatar from "../../components/Avatar";

export default function ChatItem(props) {
  return (
    <div
      className={`w-full px-5 py-4 cursor-pointer ${
        props.newChat ? "bg-green-100" : "bg-white hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center">
        <div className="mr-4">
          <Avatar />
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="mr-4">
            <div className="font-bold">Tên</div>
            {props.newChat ? (
              <div className="w-36 font-bold text-green-600 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                Tin nhắn Tin nhắn Tin nhắn Tin nhắn
              </div>
            ) : (
              <div className="w-36 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                Tin nhắn Tin nhắn Tin nhắn Tin nhắn
              </div>
            )}
          </div>
          <div className="flex flex-col items-end">
            <div className="text-gray-400 text-sm">4:30 PM</div>
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
