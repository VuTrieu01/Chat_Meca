import React from "react";
import Avatar from "../../components/Avatar";
import Ping from "../../components/Ping";
import { IoCall, IoSend } from "react-icons/io5";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { BiImageAdd } from "react-icons/bi";
import Scrollbar from "../../components/Scrollbar";
import ChatContent from "./ChatContent";
import TextField from "../../components/TextField";

export default function Conversations() {
  return (
    <div className="h-screen w-full">
      <div className="h-full w-full bg-gray-100">
        <div className="flex items-center justify-between bg-white p-3 border-gray-50 border-b-2">
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
          <div className="w-24 flex justify-between text-green-600 text-xl">
            <IoCall className="cursor-pointer" />
            <BsFillCameraVideoFill className="cursor-pointer" />
            <HiDotsCircleHorizontal className="cursor-pointer" />
          </div>
        </div>
        <Scrollbar>
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
        <div className="flex items-center bg-white px-10 py-4">
          <div className="relative w-full">
            <input
              type="search"
              className="block w-full p-3 pr-10 text-sm rounded-lg border-2 border-gray-100 bg-gray-100 focus:border-2 focus:border-green-600 focus:outline-0"
              placeholder="Aa"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-700">
              <div className=" border-green-700 border-l-2"></div>
              <BiImageAdd className="text-2xl mr-2 cursor-pointer" />
              <IoSend className="text-xl cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
