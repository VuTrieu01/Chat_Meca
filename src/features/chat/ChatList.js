import React from "react";
import { AiOutlineUsergroupAdd, AiFillWechat } from "react-icons/ai";
import SearchInput from "../../components/SearchInput";
import ChatItem from "../chat/ChatItem";

export default function ChatList() {
  return (
    <div className="h-full w-80 border-gray-50 border-r-2">
      <div className="h-full py-5">
        <div className="flex items-center justify-between mx-5 mb-5">
          <p className="font-bold text-2xl">Chat</p>
          <AiOutlineUsergroupAdd className="text-xl ml-10" />
        </div>
        <SearchInput sx={"mx-5"} />
        <div className="flex items-center text-gray-400 mx-5 mb-4">
          <AiFillWechat className="mr-2" /> Tất cả tin nhắn
        </div>
        <div className="h-4/5 overflow-auto select-none scrollbar">
          <ChatItem newChat={true} />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </div>
      </div>
    </div>
  );
}
