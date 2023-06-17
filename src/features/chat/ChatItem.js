import { child, update } from "firebase/database";
import React from "react";
import Avatar from "../../components/Avatar";
import Ping from "../../components/Ping";
import useStore from "../../zustand/store";
import { ConvertNumberToTime } from "../../components/ConvertNumberToTime";

export default function ChatItem({ openChatItem, chatArray, accounts, currentUser, dbRef }) {
     const addUserFriend = useStore((state) => state.addUserFriend);
     const setOpenChat = useStore((state) => state.setOpenChat);
     const setOpenChatItem = useStore((state) => state.setOpenChatItem);
     const chatData = chatArray.filter((val) => (val.accountId === currentUser.uid && val.accountFriendId === accounts.uid) || (val.accountId === accounts.uid && val.accountFriendId === currentUser.uid)).sort((a, b) => b.lastLoggedInTime - a.lastLoggedInTime)[0];
     const countNewChat = chatArray.filter((val) => val.accountId === accounts.uid && val.accountFriendId === currentUser.uid && val.newText === true).length;
     const handleClick = (item) => {
          chatArray.map((upItem) => {
               if (upItem.accountId === item.uid && upItem.accountFriendId.includes(currentUser.uid) && upItem.newText === true) {
                    update(child(dbRef, `Chat/${item.uid}/${currentUser.uid}/${upItem.uid}`), {
                         newText: false,
                    });
               }
               return null;
          });
          setOpenChatItem(item.uid);
          addUserFriend(item);
          setOpenChat(true);
     };
     return (
          <div className={`w-full px-5 py-4 cursor-pointer ${openChatItem === accounts.uid ? "bg-green-100" : "bg-white hover:bg-gray-100"}`} onClick={() => handleClick(accounts)}>
               <div className="flex items-center">
                    <div className="flex items-end">
                         <Avatar url={accounts.avatar} sx={`${!accounts.active && "mr-2"}`}/>
                         {accounts.active && <Ping sx="right-3" />}
                    </div>
                    <div className="w-full flex items-center justify-between">
                         <div className="mr-4">
                              <div className="w-48 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                   {accounts.lastName} {accounts.firstName}
                              </div>
                              <div className={`w-48 ${chatData.newText && chatData.accountId !== currentUser.uid ? " font-bold text-green-600" : ""} text-sm whitespace-nowrap overflow-hidden overflow-ellipsis`}>{chatData.chat}</div>
                         </div>
                         <div className="flex flex-col items-end">
                              <div className="text-gray-400 text-sm">{ConvertNumberToTime(chatData.lastLoggedInTime)}</div>
                              <div className={`${chatData.newText && chatData.accountId !== currentUser.uid ? "flex items-center justify-center bg-red-600 text-white font-bold rounded-full text-xs" : ""} h-5 w-5 p-2`}>{chatData.newText && chatData.accountId !== currentUser.uid ? (countNewChat < 100 ? countNewChat : "99") : ""}</div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
