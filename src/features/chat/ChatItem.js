import { child, update } from "firebase/database";
import React from "react";
import Avatar from "../../components/Avatar";
import Ping from "../../components/Ping";
import useStore from "../../zustand/store";
import { ConvertNumberToTime } from "../../components/ConvertNumberToTime";

export default function ChatItem({ openChatItem, chatArray, accounts, currentUser, dbRef, group, messenger }) {
     const addUserFriend = useStore((state) => state.addUserFriend);
     const addDataGroup = useStore((state) => state.addDataGroup);
     const setOpenChat = useStore((state) => state.setOpenChat);
     const setOpenChatItem = useStore((state) => state.setOpenChatItem);
     const chatData = accounts && chatArray.filter((val) => (val.accountId === currentUser.uid && val.accountFriendId === accounts.uid) || (val.accountId === accounts.uid && val.accountFriendId === currentUser.uid)).sort((a, b) => b.lastLoggedInTime - a.lastLoggedInTime)[0];
     const chatGroup = group && Object.values(messenger !== undefined && messenger)
          .flatMap((obj) => Object.values(obj))
          .filter((val) => val.groupId === group.uid)
     const chatGroupData = group && chatGroup.sort((a, b) => b.lastLoggedInTime - a.lastLoggedInTime)[0];
     const countNewChat = accounts && chatArray.filter((val) => val.accountId === accounts.uid && val.accountFriendId === currentUser.uid && val.newText === true).length;
     const handleClick = (accounts, group) => {
          if (accounts) {
               chatArray.map((upItem) => {
                    if (upItem.accountId === accounts.uid && upItem.accountFriendId.includes(currentUser.uid) && upItem.newText === true) {
                         update(child(dbRef, `Chat/${accounts.uid}/${currentUser.uid}/${upItem.uid}`), {
                              newText: false,
                         });
                    }
                    return null;
               });
               setOpenChatItem(accounts.uid);
               addDataGroup(undefined);
               addUserFriend(accounts);
               setOpenChat(true);
          }
          if (group) {
               setOpenChatItem(group.uid);
               addDataGroup(group);
               addUserFriend(undefined);
               setOpenChat(true);
          }
     };
     return (
          <div className={`w-full px-5 py-4 cursor-pointer ${accounts ? openChatItem === accounts.uid ? "bg-green-100" : "bg-white hover:bg-gray-100" : openChatItem === group.uid ? "bg-green-100" : "bg-white hover:bg-gray-100"}`} onClick={() => handleClick(accounts && accounts, group && group)}>
               <div className="flex items-center">
                    <div className="flex items-end">
                         <Avatar url={accounts ? accounts.avatar : group.avatarURL} sx={`${accounts && accounts.active ? "" : "mr-2"}`}/>
                         {accounts && accounts.active && <Ping sx="right-3" />}
                    </div>
                    <div className="w-full flex items-center justify-between">
                         <div className="mr-4">
                              <div className="w-48 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                   {accounts && accounts.lastName + " " + accounts.firstName} {group && group.name}
                              </div>
                              <div className={`w-48 ${accounts && chatData.newText && chatData.accountId !== currentUser.uid ? " font-bold text-green-600" : ""} text-sm whitespace-nowrap overflow-hidden overflow-ellipsis`}>{accounts && chatData.chat && chatData.chat} {accounts && chatData.img && "Đã gửi một ảnh"}</div>
                              {group && chatGroupData !== undefined && <div className="w-48 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">{chatGroupData.chat && chatGroupData.chat} {chatGroupData.img && "Đã gửi một ảnh"}</div>}
                         </div>
                         {accounts && <div className="flex flex-col items-end">
                              <div className="text-gray-400 text-sm">{ConvertNumberToTime(chatData.lastLoggedInTime)}</div>
                              <div className={`${chatData.newText && chatData.accountId !== currentUser.uid ? "flex items-center justify-center bg-red-600 text-white font-bold rounded-full text-xs" : ""} h-5 w-5 p-2`}>
                                   {chatData.newText && chatData.accountId !== currentUser.uid ? (countNewChat < 6 ? countNewChat : "+5") : ""}
                              </div>
                         </div>}
                         {group && chatGroupData !== undefined && <div className="flex flex-col items-end">
                              <div className="text-gray-400 text-sm">{ConvertNumberToTime(chatGroupData.lastLoggedInTime)}</div>
                         </div>}
                    </div>
               </div>
          </div>
     );
}
