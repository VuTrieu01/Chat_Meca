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
          <ChatItem
            newChat={true}
            active={true}
            time="1 phút"
            name="Hồng Hoàng"
            url="https://material-ui.com/static/images/avatar/2.jpg"
          />
          <ChatItem click={true} test="Mai gặp" time="5 phút" name="Hoàng Vũ" />
          <ChatItem
            test="Được thôi"
            time="5 tiếng"
            name="Bá Việt"
            url="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <ChatItem
            test="Oke"
            active={true}
            time="6 tiếng"
            name="Tô Vũ"
            url="https://material-ui.com/static/images/avatar/3.jpg"
          />
          <ChatItem
            test="Được rồi"
            time="8 tiếng"
            name="Nguyễn Hào"
            url="https://material-ui.com/static/images/avatar/4.jpg"
          />
          <ChatItem
            test="Oke"
            time="10 tiếng"
            name="Định Hòa"
            url="https://images.unsplash.com/photo-1551782450-a2132b4ba21d"
          />
          <ChatItem
            test="Chắc chắn"
            time="11 tiếng"
            name="Hoàng Vũ"
            url="https://material-ui.com/static/images/avatar/6.jpg"
          />
          <ChatItem
            active={true}
            time="1 ngày"
            name="Vũ"
            url="https://images.unsplash.com/photo-1522770179533-24471fcdba45"
          />
          <ChatItem time="1 ngày" />
          <ChatItem test="Oke" time="1 ngày" />
          <ChatItem test="Mai gặp" time="1 ngày" />
        </Scrollbar>
      </div>
    </div>
  );
}
