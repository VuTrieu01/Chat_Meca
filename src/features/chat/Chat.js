import React from "react";
import ChatList from "./ChatList";
import Conversations from "./Conversations";
import ConversationInfo from "./ConversationInfo";

export default function Chat() {
  return (
    <div className="h-screen w-full">
      <div className="h-full w-full flex">
        <ChatList />
        <Conversations />
        <ConversationInfo />
      </div>
    </div>
  );
}
