import React from "react";
import { AiOutlineUsergroupAdd, AiFillWechat } from "react-icons/ai";
import Scrollbar from "../../components/Scrollbar";
import SearchInput from "../../components/SearchInput";
import ChatItem from "../chat/ChatItem";

export default function ChatList() {
  return (
    <div className="h-full w-2/5 border-gray-100 border-r-2">
      <div className="h-full py-5">
        <div className="flex items-center justify-between mx-5 mb-5">
          <p className="font-bold text-2xl">Chat</p>
          <AiOutlineUsergroupAdd className="text-xl ml-10 cursor-pointer" />
        </div>
        <SearchInput sx="mx-5 mb-5" />
        <div className="flex items-center text-gray-400 mx-5 mb-4">
          <AiFillWechat className="mr-2" /> Tất cả tin nhắn
        </div>
        <Scrollbar>
          <ChatItem newChat={true} active={true} />
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
        </Scrollbar>
      </div>
    </div>
  );
}
