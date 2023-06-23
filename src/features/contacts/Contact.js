import React, { useEffect, useState } from "react";
import ContactMenu from "./ContactMenu";
import FriendRequests from "./FriendRequests";
import FriendsList from "./FriendsList";
import useStore from "../../zustand/store";
import AddFriend from "./AddFriend";
import { useAuth } from "../../context/AuthContext";
import { child, onValue, ref } from "firebase/database";
import { database } from "../../firebase";
import ChatView from "../chat/ChatView";

export default function Contact() {
     const activeContact = useStore((state) => state.activeContact);
     const openChat = useStore((state) => state.openChat);
     const { currentUser } = useAuth();
     const dbRef = ref(database);
     const [accounts, setAccounts] = useState([]);
     const [friends, setFriends] = useState([]);
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
          onValue(child(dbRef, `Friends`), (snapshot) => {
               setFriends([]);
               const data = snapshot.val();
               if (data !== null) {
                    Object.values(data).map((item) => {
                         return setFriends((oldArray) => [...oldArray, item]);
                    });
               }
          });
     }, [dbRef]);
     const mutualFriends = Object.values(friends).flatMap((obj) => Object.values(obj)).filter((val) => val.status === true);
     // Tạo bảng băm để lưu trữ danh sách bạn của mỗi người dùng
     const userMap = [];
     let idUser = [];
     mutualFriends.forEach((user) => {
          if (idUser.includes(user.accountId)) {
               userMap[user.accountId].push(user.accountFriendId);
          } else {
               userMap[user.accountId] = [user.accountFriendId];
               idUser.push(user.accountId);
          }
     });
     // Tìm kiếm số lượng bạn chung giữa hai người dùng
     const getCommonFriendsCount = (userId1) => {
          const friends1 = userMap[userId1];
          const friends2 = userMap[currentUser.uid];
          let count = 0;
          if (friends1 !== undefined) {
               friends1.forEach((friendId) => {
                    if (friends2.includes(friendId)) {
                         count++;
                    }
               });
          }
          return count;
     };
     const getDataFriends = (userId1) => {
          const friends1 = userMap[userId1];
          const friends2 = userMap[currentUser.uid];
          let dataFriends = [];
          if (friends1 !== undefined) {
               dataFriends = [...friends1.filter((val) => friends2.includes(val))];
          }
          return dataFriends;
     };
     return (
          <div className="h-screen w-full">
               <div className="h-full w-full flex">
                    <ContactMenu />
                    {activeContact === 0 ? openChat ? <ChatView /> 
                    : <FriendsList currentUser={currentUser} accounts={accounts} friends={friends} getCommonFriendsCount={getCommonFriendsCount} /> 
                    : activeContact === 1 ? <FriendRequests currentUser={currentUser} accounts={accounts} friends={friends} getCommonFriendsCount={getCommonFriendsCount} /> 
                    : <AddFriend currentUser={currentUser} accounts={accounts} friends={friends} getCommonFriendsCount={getCommonFriendsCount} getDataFriends={getDataFriends}/>}
               </div>
          </div>
     );
}
