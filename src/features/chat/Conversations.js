import React, { useRef } from "react";
import Avatar from "../../components/Avatar";
import Ping from "../../components/Ping";
import { IoCall, IoSend } from "react-icons/io5";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { BiImageAdd } from "react-icons/bi";
import Scrollbar from "../../components/Scrollbar";
import ChatContent from "./ChatContent";

export default function Conversations() {
  const messageEl = useRef(null);
  return (
    <div className="h-screen w-full">
      <div className="h-full w-full bg-gray-100">
        <div className="flex items-center justify-between bg-white p-3 border-gray-100 border-b-2">
          <div className="flex items-center">
            <div className="flex items-end">
              <Avatar />
              <Ping sx="right-3" />
            </div>
            <div className="ml-1">
              <p className="font-bold">Tên</p>
              <p>Đang hoạt động</p>
            </div>
          </div>
          <div className="w-28 flex justify-between text-green-600 text-3xl">
            <IoCall className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" />
            <BsFillCameraVideoFill className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" />
            <HiDotsCircleHorizontal className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" />
          </div>
        </div>
        <Scrollbar messageEl={messageEl}>
          <ChatContent type={true} />
          <ChatContent />
          <ChatContent type={true} />
          <ChatContent />
          <ChatContent type={true} />
          <ChatContent />
          <ChatContent type={true} />
          <ChatContent />
          <ChatContent type={true} />
          <ChatContent />
        </Scrollbar>
        <div className="flex items-center bg-white px-10 py-[0.90rem]">
          <div className="relative w-full">
            <input
              type="search"
              className="block w-full p-3 pr-10 text-sm rounded-lg border-2 border-gray-100 bg-gray-100 focus:border-2 focus:border-green-600 focus:outline-0"
              placeholder="Aa"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-700">
              <BiImageAdd className="text-2xl mr-2 cursor-pointer hover:text-green-500" />
              <IoSend className="text-xl cursor-pointer hover:text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
