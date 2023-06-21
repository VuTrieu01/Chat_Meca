import React, { useEffect, useState } from "react";
import Conversations from "./Conversations";
import ConversationInfo from "./ConversationInfo";
import useStore from "../../zustand/store";
import { database } from "../../firebase";
import { child, onValue, ref } from "firebase/database";
import { useAuth } from "../../context/AuthContext";

export default function ChatView() {
     const dataUserFriend = useStore((state) => state.dataUserFriend);
     const dataGroup = useStore((state) => state.dataGroup);
     const [messenger, setMessenger] = useState();
     const dbRef = ref(database);
     const { currentUser } = useAuth();
     const [accounts, setAccounts] = useState([]);
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
     const userFriend = dataUserFriend && accounts.filter((val) => val.uid.includes(dataUserFriend.uid));
     const chatArray = dataUserFriend && Object.values(messenger !== undefined && messenger)
          .flatMap((obj) => Object.values(obj))
          .flatMap((obj) => Object.values(obj))
          .filter((val) => (val.accountId === currentUser.uid && val.accountFriendId.includes(dataUserFriend.uid)) || (val.accountId === dataUserFriend.uid && val.accountFriendId.includes(currentUser.uid)));
     const chatGroup = dataGroup && Object.values(messenger !== undefined && messenger)
          .flatMap((obj) => Object.values(obj))
          .filter((val) => val.groupId === dataGroup.uid)
     const memberGroup = dataGroup && accounts.filter((val) => val.uid !== currentUser.uid && chatGroup.map((val) => val.accountFriendId).includes(val.uid));
     return (
          <>
               <Conversations userFriend={userFriend} currentUser={currentUser} dbRef={dbRef} chatArray={chatArray} dataGroup={dataGroup} chatGroup={chatGroup} memberGroup={memberGroup}/>
               <ConversationInfo userFriend={userFriend} currentUser={currentUser} accounts={accounts} dataGroup={dataGroup} />
          </>
     );
}
