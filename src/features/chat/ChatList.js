import React, { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd, AiFillWechat } from "react-icons/ai";
import Scrollbar from "../../components/Scrollbar";
import SearchInput from "../../components/SearchInput";
import ChatItem from "../chat/ChatItem";
import { database } from "../../firebase";
import { child, onValue, ref } from "firebase/database";
import { useAuth } from "../../context/AuthContext";
import useStore from "../../zustand/store";

export default function ChatList() {
     const dbRef = ref(database);
     const { currentUser } = useAuth();
     const [messenger, setMessenger] = useState([]);
     const [accounts, setAccounts] = useState([]);
     const openChatItem = useStore((state) => state.openChatItem);
     useEffect(() => {
          onValue(child(dbRef, `Account`), (snapshot) => {
               setAccounts([]);
               const data = snapshot.val();
               if (data !== null) {
                    Object.values(data).map((item) => {
                         return setAccounts((oldArray) => [...oldArray, item]);
                    });
               }
          });
          onValue(child(dbRef, `Chat`), (snapshot) => {
               setMessenger([]);
               const data = snapshot.val();
               if (data !== null) {
                    Object.values(data).map((item) => {
                         return setMessenger((oldArray) => [...oldArray, item]);
                    });
               }
          });
     }, [dbRef]);
     const chatArray = Object.values(messenger !== undefined && messenger)
          .flatMap((obj) => Object.values(obj))
          .flatMap((obj) => Object.values(obj));
     const userFriend = accounts
          .filter(
               (val) =>
                    chatArray
                         .filter((val) => val.accountId === currentUser.uid)
                         .map((item) => item.accountFriendId)
                         .includes(val.uid) ||
                    chatArray
                         .filter((val) => val.accountFriendId === currentUser.uid)
                         .map((item) => item.accountId)[0]
                         .includes(val.uid)
          )
          .map((friend) => {
               const chat = chatArray.filter((val) => (val.accountId === currentUser.uid && val.accountFriendId === friend.uid) || (val.accountFriendId === currentUser.uid && val.accountId === friend.uid)).sort((a, b) => b.lastLoggedInTime - a.lastLoggedInTime)[0];
               return {
                    ...friend,
                    time: chat ? chat.lastLoggedInTime : 0,
               };
          });
     return (
          <div className="h-full border-gray-100 border-r-2">
               <div className="h-full w-[22rem] py-5">
                    <div className="flex items-center justify-between mx-5 mb-5">
                         <p className="font-bold text-2xl">Chat</p>
                         <AiOutlineUsergroupAdd className="text-xl ml-10 cursor-pointer" />
                    </div>
                    <SearchInput sx="mx-5 mb-5" />
                    <div className="flex items-center text-gray-400 mx-5 mb-4">
                         <AiFillWechat className="mr-2" /> Tất cả tin nhắn
                    </div>
                    {userFriend.length > 0 ? (
                         <Scrollbar>
                              {userFriend
                                   .sort((a, b) => b.time - a.time)
                                   .map((item, index) => (
                                        <ChatItem key={index} openChatItem={openChatItem} chatArray={chatArray} accounts={item} currentUser={currentUser} dbRef={dbRef} />
                                   ))}
                         </Scrollbar>
                    ) : (
                         <div className="mx-5">Không có cuộc trò chuyện nào</div>
                    )}
               </div>
          </div>
     );
}
