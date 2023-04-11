import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../components/Avatar";
import Ping from "../../components/Ping";
import { IoCall, IoSend } from "react-icons/io5";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { BiImageAdd } from "react-icons/bi";
import Scrollbar from "../../components/Scrollbar";
import ChatContent from "./ChatContent";
import OfflineTimeCounter from "../../components/OfflineTimeCounter";
import { uid } from "uid";
import { ref, set } from "firebase/database";
import { database } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import useStore from "../../zustand/store";

export default function Conversations(props) {
  const uuid = uid();
  const { currentUser } = useAuth();
  const provisionalDataAccount = props.provisionalDataAccount;
  const messageEl = useRef(null);
  const [values, setValues] = useState("");
  const setActiveSidebar = useStore((state) => state.setActiveSidebar);
  const setOpenChatItem = useStore((state) => state.setOpenChatItem);
  const lastLoggedInTime = new Date();
  const handleChat = (item) => {
    if (props.chat.length >= 0) {
      set(ref(database, `Chat` + `/${uuid}`), {
        uid: uuid,
        accountId: currentUser.uid,
        accountFriendId: item.uid,
        newText: true,
        text: values,
        lastLoggedInTime: lastLoggedInTime.getTime(),
      });
    }
    if (props.chatFriend.length > 0) {
      set(ref(database, `Chat` + `/${uuid}`), {
        uid: uuid,
        accountId: item.uid,
        accountFriendId: currentUser.uid,
        newText: true,
        textFriend: values,
        lastLoggedInTime: lastLoggedInTime.getTime(),
      });
    }
    setValues("");
    setActiveSidebar(0);
    setOpenChatItem(true);
  };
  const handleChange = (e) => {
    setValues(e.target.value);
  };
  return (
    <div className="h-screen w-full">
      {provisionalDataAccount.map((item, index) => (
        <div className="h-full w-full bg-gray-100" key={index}>
          <div className="flex items-center justify-between bg-white p-3 border-gray-100 border-b-2">
            {item.active ? (
              <div className="flex items-center">
                <div className="flex items-end">
                  <Avatar />
                  <Ping sx="right-3" />
                </div>
                <div className="ml-1">
                  <p className="font-bold">
                    {item.lastName} {item.firstName}
                  </p>
                  <p>Đang hoạt động</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <Avatar sx="mr-1" />
                <div className="ml-1">
                  <p className="font-bold">
                    {item.lastName} {item.firstName}
                  </p>
                  <div className="flex">
                    <div className="mr-1">Hoạt động:</div>
                    <OfflineTimeCounter
                      lastLoggedInTime={item.lastLoggedInTime}
                    />
                    <div className="ml-1">trước</div>
                  </div>
                </div>
              </div>
            )}
            <div className="w-28 flex justify-between text-green-600 text-3xl">
              <IoCall className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" />
              <BsFillCameraVideoFill className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" />
              <HiDotsCircleHorizontal className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" />
            </div>
          </div>
          <Scrollbar messageEl={messageEl}>
            <ChatContent chat={props.chat} />
            <ChatContent chatFriend={props.chatFriend} />
          </Scrollbar>
          <div className="flex items-center bg-white px-10 py-[0.90rem]">
            <div className="relative w-full h-full">
              <textarea
                className="block w-full h-12 p-3 pr-16 text-sm rounded-lg border-2 border-gray-100 bg-gray-100 focus:border-2 focus:border-green-600 focus:outline-0 resize-none"
                placeholder="Aa"
                value={values}
                onChange={handleChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-700">
                <BiImageAdd className="text-2xl mr-2 cursor-pointer hover:text-green-500" />
                {values.length > 0 && (
                  <IoSend
                    className="text-xl cursor-pointer hover:text-green-500"
                    onClick={() => handleChat(item)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
