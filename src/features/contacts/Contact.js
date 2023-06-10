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
          setAccounts((oldArray) => [...oldArray, item]);
        });
      }
    });
    onValue(child(dbRef, `Friends`), (snapshot) => {
      setFriends([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((item) => {
          setFriends((oldArray) => [...oldArray, item]);
        });
      }
    });
  }, []);
  return (
    <div className="h-screen w-full">
      <div className="h-full w-full flex">
        <ContactMenu />
        {activeContact === 0 ? (
          openChat ? (
            <ChatView />
          ) : (
            <FriendsList
              currentUser={currentUser}
              accounts={accounts}
              friends={friends}
            />
          )
        ) : activeContact === 1 ? (
          <FriendRequests
            currentUser={currentUser}
            accounts={accounts}
            friends={friends}
          />
        ) : (
          <AddFriend
            currentUser={currentUser}
            accounts={accounts}
            friends={friends}
          />
        )}
      </div>
    </div>
  );
}
