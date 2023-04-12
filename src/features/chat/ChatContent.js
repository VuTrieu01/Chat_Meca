import React from "react";
import Avatar from "../../components/Avatar";
import { ConvertNumberToTime } from "../../components/ConvertNumberToTime";

export default function ChatContent(props) {
  let chat = [];
  let chatFriend = [];
  if (props.chat !== undefined) {
    chat = props.chat.sort((a, b) => a.lastLoggedInTime - b.lastLoggedInTime);
  }
  if (props.chatFriend !== undefined) {
    chatFriend = props.chatFriend.sort(
      (a, b) => a.lastLoggedInTime - b.lastLoggedInTime
    );
  }
  return (
    <>
      {chat.map((item, index) => (
        <div className="m-4" key={index}>
          {item.text ? (
            <div className="flex justify-end ml-14">
              <div
                title={ConvertNumberToTime(item.lastLoggedInTime)}
                className="max-w-[23rem] bg-green-500 text-white py-2 px-4 rounded-3xl break-words"
              >
                {item.text}
              </div>
            </div>
          ) : (
            <div className="flex">
              <Avatar />
              <div
                title={ConvertNumberToTime(item.lastLoggedInTime)}
                className="max-w-[23rem] bg-gray-200 text-black py-2 px-4 rounded-3xl ml-3 mr-14 break-words"
              >
                {item.textFriend}
              </div>
            </div>
          )}
        </div>
      ))}
      {chatFriend.map((item, index) => (
        <div className="m-4" key={index}>
          {item.textFriend ? (
            <div className="flex justify-end ml-14">
              <div
                title={ConvertNumberToTime(item.lastLoggedInTime)}
                className="max-w-[23rem] bg-green-500 text-white py-2 px-4 rounded-3xl break-words"
              >
                {item.textFriend}
              </div>
            </div>
          ) : (
            <div className="flex">
              <Avatar />
              <div
                title={ConvertNumberToTime(item.lastLoggedInTime)}
                className="max-w-[23rem] bg-gray-200 text-black py-2 px-4 rounded-3xl ml-3 mr-14 break-words"
              >
                {item.text}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
