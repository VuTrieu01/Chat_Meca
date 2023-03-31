import React, { useEffect, useState } from "react";
import Conversations from "./Conversations";
import ConversationInfo from "./ConversationInfo";
import useStore from "../../zustand/store";
import { database } from "../../firebase";
import { child, onValue, ref } from "firebase/database";
import { useAuth } from "../../context/AuthContext";

export default function ChatView() {
  const dbRef = ref(database);
  const { currentUser } = useAuth();
  const [messenger, setMessenger] = useState();
  const provisionalDataAccount = useStore(
    (state) => state.provisionalDataAccount
  );
  useEffect(() => {
    onValue(child(dbRef, `Chat`), (snapshot) => {
      setMessenger([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((item) => {
          setMessenger((oldArray) => [...oldArray, item]);
        });
      }
    });
  }, []);
  let chat = [];
  let chatFriend = [];
  if (messenger !== undefined) {
    chat = messenger.filter(
      (val) =>
        val.accountId === currentUser.uid &&
        provisionalDataAccount
          .map((item) => item.uid)
          .includes(val.accountFriendId)
    );
    chatFriend = messenger.filter(
      (val) =>
        val.accountFriendId === currentUser.uid &&
        provisionalDataAccount.map((item) => item.uid).includes(val.accountId)
    );
  }
  return (
    <>
      <Conversations
        provisionalDataAccount={provisionalDataAccount}
        chat={chat}
        chatFriend={chatFriend}
      />
      <ConversationInfo provisionalDataAccount={provisionalDataAccount}/>
    </>
  );
}
