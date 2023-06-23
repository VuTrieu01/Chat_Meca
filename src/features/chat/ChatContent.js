import React from "react";
import Avatar from "../../components/Avatar";
import { ConvertNumberToTime } from "../../components/ConvertNumberToTime";

export default function ChatContent({ userFriend, chatArray, currentUser, memberGroup, chatGroup }) {
  const chatData = chatArray && chatArray.sort((a, b) => a.lastLoggedInTime - b.lastLoggedInTime);
  const chatDataGroup = chatGroup && chatGroup.sort((a, b) => a.lastLoggedInTime - b.lastLoggedInTime);
  const getAvatarMember = (id) => {
    return chatGroup && memberGroup.find((val) => val.uid === id).avatar;
  }
  return (
    <>
      {!chatGroup && chatData.map((item, index) => (
        <div className="m-4" key={index}>
            <div className={`flex ${item.accountId === currentUser.uid ? "justify-end ml-14" : ""}`}>
              {item.accountFriendId === currentUser.uid && <Avatar url={userFriend.avatar}/>}
              <div
                title={ConvertNumberToTime(item.lastLoggedInTime)}
                className={`max-w-[23rem] py-2 px-4 rounded-3xl break-words ${item.accountId === currentUser.uid ? "bg-green-500 text-white" : "bg-gray-200 text-black ml-3 mr-14"}`}
              >
                {item.chat}
              </div>
            </div>
        </div>
      ))}
      {
        chatGroup && chatDataGroup.map((item, index) => (
          <div className="m-4" key={index}>
              <div className={`flex ${item.accountFriendId === currentUser.uid ? "justify-end ml-14" : ""}`}>
                {item.accountFriendId !== currentUser.uid && <Avatar url={getAvatarMember(item.accountFriendId)}/>}
                <div
                  title={ConvertNumberToTime(item.lastLoggedInTime)}
                  className={`max-w-[23rem] py-2 px-4 rounded-3xl break-words ${item.accountFriendId === currentUser.uid ? "bg-green-500 text-white" : "bg-gray-200 text-black ml-3 mr-14"}`}
                >
                  {item.chat}
                </div>
              </div>
          </div>
        ))
      }
    </>
  );
}
