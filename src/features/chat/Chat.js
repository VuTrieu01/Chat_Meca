import React from "react";
import ChatList from "./ChatList";
import ChatView from "./ChatView";
import ConversationInfo from "./ConversationInfo";

export default function Chat() {
  return (
    <div className="h-screen">
      <div className="h-full w-full flex">
        <ChatList />
        <ChatView />
        <ConversationInfo />
      </div>
    </div>
  );
}
