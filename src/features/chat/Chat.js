import React from "react";
import useStore from "../../zustand/store";
import ChatList from "./ChatList";
import ChatView from "./ChatView";

export default function Chat() {
  const provisionalDataAccount = useStore(
    (state) => state.provisionalDataAccount
  );
  return (
    <div className="h-screen w-full">
      <div className="h-full w-full flex">
        <ChatList />
        {provisionalDataAccount.length > 0 ? (
          <ChatView />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/order-drinks-594fe.appspot.com/o/chat.png?alt=media&token=3b1c2798-a6b4-4d06-8ece-c40fce6b2b64"
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
