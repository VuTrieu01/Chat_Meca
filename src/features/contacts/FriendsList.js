import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import SearchInput from "../../components/SearchInput";
import Scrollbar from "../../components/Scrollbar";
import Friend from "./Friend";

export default function FriendsList() {
  return (
    <div className="h-full w-full">
      <div className="h-[75%] md:h-full md:w-full bg-white">
        <div className="flex items-center justify-between bg-white p-6 border-gray-100 border-b-2">
          <div className="flex items-center">
            <HiOutlineUserGroup className="text-2xl" />
            <div className="ml-4 font-bold">Danh sách bạn bè</div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full py-[0.43rem] px-6 border-gray-100 border-b-2">
          <div className="font-bold">Bạn bè (0)</div>
          <SearchInput sx="w-2/5" />
        </div>
        <Scrollbar>
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
        </Scrollbar>
      </div>
    </div>
  );
}
