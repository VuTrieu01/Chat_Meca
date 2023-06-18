import React, { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Scrollbar from "../../components/Scrollbar";
import SearchInput from "../../components/SearchInput";
import ChatItem from "../chat/ChatItem";
import { database } from "../../firebase";
import { child, onValue, ref } from "firebase/database";
import { useAuth } from "../../context/AuthContext";
import useStore from "../../zustand/store";
import GroupForm from "../group/GroupForm";

export default function ChatList() {
     const dbRef = ref(database);
     const { currentUser } = useAuth();
     const [messenger, setMessenger] = useState([]);
     const [accounts, setAccounts] = useState([]);
     const [openListChat, setOpenListChat] = useState(true);
     const [openGroupForm, closeGroupForm] = useState("hidden");
     const openChatItem = useStore((state) => state.openChatItem);
     const [valueGroup, setValueGroup] = useState({
          avatar: "",
     });
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
     const chatArray = Object.values(messenger)
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
                         .map((item) => item.accountId)
                         .includes(val.uid)
          )
          .map((friend) => {
               const chat = chatArray.filter((val) => (val.accountId === currentUser.uid && val.accountFriendId === friend.uid) || (val.accountFriendId === currentUser.uid && val.accountId === friend.uid)).sort((a, b) => b.lastLoggedInTime - a.lastLoggedInTime)[0];
               return {
                    ...friend,
                    time: chat ? chat.lastLoggedInTime : 0,
               };
          });
     const countNewChat = accounts.filter((val) => chatArray.filter((val) => val.accountFriendId === currentUser.uid && val.newText === true).map((item) => item.accountId).includes(val.uid)).length;
     return (
          <div className="h-full border-gray-100 border-r-2">
               <div className="h-full w-[22rem] py-5">
                    <div className="flex items-center justify-between mx-5 mb-5">
                         <p className="font-bold text-2xl">Chat</p>
                         <AiOutlineUsergroupAdd title="Tạo nhóm" className="text-xl ml-10 cursor-pointer" onClick={() => closeGroupForm("")} />
                    </div>
                    <GroupForm openGroupForm={openGroupForm} closeGroupForm={closeGroupForm} values={valueGroup} setValues={setValueGroup} />
                    <SearchInput sx="mx-5 mb-5" />
                    <div className="flex items-center border-gray-100 border-b-2 font-bold text-gray-500 text-sm px-5">
                         <div onClick={() => setOpenListChat(true)} className={`relative pb-4 transition duration-300 ${openListChat ? "border-green-600 border-b-2 text-green-600" : "border-white border-b-2 hover:text-green-600"} cursor-pointer mr-6`}>
                              Cá nhân
                              {countNewChat > 0 && <div className="absolute -top-1 -right-4 h-4 w-4 p-1 flex items-center justify-center bg-red-600 text-white font-bold rounded-full text-xs">
                                   {countNewChat}
                              </div>}
                         </div>
                         <div onClick={() => setOpenListChat(false)} className={`relative pb-4 transition duration-300 ${!openListChat ? "border-green-600 border-b-2 text-green-600" : "border-white border-b-2 hover:text-green-600"} cursor-pointer`}>
                              Nhóm
                              <div className="absolute -top-1 -right-4 h-4 w-4 p-1 flex items-center justify-center bg-red-600 text-white font-bold rounded-full text-xs">
                                   1
                              </div>
                         </div>
                    </div>
                    {userFriend.length > 0 ? (
                         <Scrollbar>
                              {openListChat ? userFriend
                                   .sort((a, b) => b.time - a.time)
                                   .map((item, index) => (
                                        <ChatItem key={index} openChatItem={openChatItem} chatArray={chatArray} accounts={item} currentUser={currentUser} dbRef={dbRef} />
                                   )) : <div>Nhom</div>}
                         </Scrollbar>
                    ) : (
                         <div className="mx-5">Không có cuộc trò chuyện nào</div>
                    )}
               </div>
          </div>
     );
}
