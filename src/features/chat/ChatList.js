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
import LoadingPage from "../../components/LoadingPage";
import Favicon from 'react-favicon'

export default function ChatList() {
     const dbRef = ref(database);
     const { currentUser } = useAuth();
     const [messenger, setMessenger] = useState([]);
     const [accounts, setAccounts] = useState([]);
     const [group, setGroup] = useState([]);
     const [notifications, setNotifications] = useState(0);
     const [loading, setLoading] = useState("hidden");
     const [openListChat, setOpenListChat] = useState(0);
     const [openGroupForm, closeGroupForm] = useState("hidden");
     const openChatItem = useStore((state) => state.openChatItem);
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
     const countNewChat = accounts.filter((val) =>
          chatArray
               .filter((val) => val.accountFriendId === currentUser.uid && val.newText === true)
               .map((item) => item.accountId)
               .includes(val.uid)
     ).length;
     const groupArray = group
          .filter((val) => val.memberId.includes(currentUser.uid) || val.leaderId === currentUser.uid)
          .map((it) => {
               const chat = Object.values(messenger)
                    .flatMap((obj) => Object.values(obj))
                    .filter((val) => val.groupId === it.uid)
                    .sort((a, b) => b.lastLoggedInTime - a.lastLoggedInTime)[0];
               return {
                    ...it,
                    time: chat ? chat.lastLoggedInTime : 0,
               };
          });
     const countReadUser = groupArray.filter((it) => {
          const chatGroup = Object.values(messenger)
               .flatMap((obj) => Object.values(obj))
               .filter((val) => val.groupId === it.uid && val.unReadUser.find((ite) => ite === currentUser.uid))
               .map((item) => item.groupId);
          return chatGroup.length > 0 ? chatGroup : null;
     }).length;
     useEffect(() => {
          setLoading();
          setNotifications(countNewChat + countReadUser);
          onValue(child(dbRef, `Account`), (snapshot) => {
               setAccounts([]);
               const data = snapshot.val();
               if (data !== null) {
                    Object.values(data).map((item) => {
                         setLoading("hidden");
                         return setAccounts((oldArray) => [...oldArray, item]);
                    });
               }
          });
          onValue(child(dbRef, `Chat`), (snapshot) => {
               setMessenger([]);
               const data = snapshot.val();
               if (data !== null) {
                    Object.values(data).map((item) => {
                         setLoading("hidden");
                         return setMessenger((oldArray) => [...oldArray, item]);
                    });
               }
          });
          onValue(child(dbRef, `Group`), (snapshot) => {
               setGroup([]);
               const data = snapshot.val();
               if (data !== null) {
                    Object.values(data).map((item) => {
                         setLoading("hidden");
                         return setGroup((oldArray) => [...oldArray, item]);
                    });
               }
          });
          // Thay đổi tiêu đề trang web khi có thông báo mới
          // document.title = notifications > 0 ? `Meca - Bạn có ${notifications} tin nhắn mới` : "Meca";
          // const notificationElement = document.querySelector("title");
          // if (notifications > 0) {
          //      notificationElement.classList.add("animate-pulse");
          // } else {
          //      notificationElement.classList.remove("animate-pulse");
          // }
     }, [dbRef, notifications, countNewChat, countReadUser]);
     return (
          <>
          <Favicon url="favicon.ico" alertCount={notifications} iconSize={50}/>
          <div className="h-full border-gray-100 border-r-2">
               <LoadingPage openLoading={loading} />
               <div className="h-full w-[22rem] py-5">
                    <div className="flex items-center justify-between mx-5 mb-5">
                         <p className="font-bold text-2xl">Chat</p>
                         <AiOutlineUsergroupAdd title="Tạo nhóm" className="text-xl ml-10 cursor-pointer" onClick={() => closeGroupForm("")} />
                    </div>
                    <GroupForm openGroupForm={openGroupForm} closeGroupForm={closeGroupForm} accounts={accounts} currentUser={currentUser} />
                    <SearchInput sx="mx-5 mb-5" />
                    <div className="flex items-center border-gray-100 border-b-2 font-bold text-gray-500 text-sm px-5">
                         <div onClick={() => setOpenListChat(0)} className={`relative pb-4 transition duration-300 ${openListChat === 0 ? "border-green-600 border-b-2 text-green-600" : "border-white border-b-2 hover:text-green-600"} cursor-pointer mr-6`}>
                              Cá nhân
                              {countNewChat > 0 && <div className="absolute -top-1 -right-4 h-4 w-4 p-1 flex items-center justify-center bg-red-600 text-white font-bold rounded-full text-xs">{countNewChat}</div>}
                         </div>
                         <div onClick={() => setOpenListChat(1)} className={`relative pb-4 transition duration-300 ${openListChat === 1 ? "border-green-600 border-b-2 text-green-600" : "border-white border-b-2 hover:text-green-600"} cursor-pointer`}>
                              Nhóm
                              {countReadUser > 0 && <div className="absolute -top-1 -right-4 h-4 w-4 p-1 flex items-center justify-center bg-red-600 text-white font-bold rounded-full text-xs">{countReadUser}</div>}
                         </div>
                    </div>
                    <Scrollbar>
                         {userFriend.length > 0 && openListChat === 0 ? userFriend.sort((a, b) => b.time - a.time).map((item, index) => <ChatItem key={index} openChatItem={openChatItem} chatArray={chatArray} accounts={item} currentUser={currentUser} dbRef={dbRef} />) : openListChat === 1 ? "" : <div className="mx-5 my-5">Không có cuộc trò chuyện nào</div>}
                         {groupArray.length > 0 && openListChat === 1 ? groupArray.sort((a, b) => b.time - a.time).map((item, index) => <ChatItem key={index} openChatItem={openChatItem} group={item} messenger={messenger} currentUser={currentUser} dbRef={dbRef} />) : openListChat === 0 ? "" : <div className="mx-5 my-5">Không có cuộc trò chuyện nào</div>}
                    </Scrollbar>
               </div>
          </div>
          </>
     );
}
