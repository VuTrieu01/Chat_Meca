import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FiMail, FiUserPlus } from "react-icons/fi";
import useStore from "../../zustand/store";

export default function ContactMenu() {
  const activeContact = useStore((state) => state.activeContact);
  const setOpenChat = useStore((state) => state.setOpenChat);
  const addUserFriend = useStore(
    (state) => state.addUserFriend
  );
  const setActiveContact = useStore((state) => state.setActiveContact);
  const handleClick = (id) => {
    if (id === 0) {
      setOpenChat(false);
    }
    setActiveContact(id);
    addUserFriend([]);
  };
  return (
    <div className="h-full border-gray-100 border-r-2">
      <div className="h-full w-[22rem] py-5">
        <div className="mx-5 mb-5">
          <p className="font-bold text-2xl">Bạn bè</p>
        </div>
        <div
          className={`flex items-center p-5 cursor-pointer ${
            activeContact === 0 ? "bg-green-100" : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => handleClick(0)}
        >
          <HiOutlineUserGroup className="text-2xl" />
          <div className="ml-4 font-bold">Danh sách bạn bè</div>
        </div>
        <div
          className={`flex items-center p-5 cursor-pointer ${
            activeContact === 1 ? "bg-green-100" : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => handleClick(1)}
        >
          <FiMail className="text-2xl" />
          <div className="ml-4 font-bold">Lời mời kết bạn</div>
        </div>
        <div
          className={`flex items-center p-5 cursor-pointer ${
            activeContact === 2 ? "bg-green-100" : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => handleClick(2)}
        >
          <FiUserPlus className="text-2xl" />
          <div className="ml-4 font-bold">Thêm bạn bè</div>
        </div>
      </div>
    </div>
  );
}
