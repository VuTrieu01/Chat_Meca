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
import { child, ref, set, update } from "firebase/database";
import { database } from "../../firebase";
import useStore from "../../zustand/store";

export default function Conversations({ userFriend, currentUser, dbRef, chatArray }) {
     const uuid = uid();
     const messageEl = useRef(null);
     const [values, setValues] = useState("");
     const [placeHolder, setPlaceHolder] = useState(true);
     const setActiveSidebar = useStore((state) => state.setActiveSidebar);
     const setOpenChatItem = useStore((state) => state.setOpenChatItem);
     const lastLoggedInTime = new Date();
     const handleChange = (e) => {
          setValues(e.target.textContent);
     };
     const handlePlaceHolder = () => {
          setPlaceHolder(false);
          setValues("");
     };
     const handleChat = (item) => {
          chatArray.map((upItem) => {
               if (upItem.accountId === item.uid && upItem.accountFriendId.includes(currentUser.uid) && upItem.newText === true) {
                    update(child(dbRef, `Chat/${item.uid}/${currentUser.uid}/${upItem.uid}`), {
                         newText: false,
                    });
               }
               return null;
          });
          set(ref(database, `Chat/${currentUser.uid}/${item.uid}/${uuid}`), {
               uid: uuid,
               accountId: currentUser.uid,
               accountFriendId: item.uid,
               newText: true,
               chat: values,
               lastLoggedInTime: lastLoggedInTime.getTime(),
          });
          setPlaceHolder(true);
          setValues("");
          setActiveSidebar(0);
          setOpenChatItem(item.uid);
     };
     return (
          <div className="h-screen w-full">
               {userFriend.map((item, index) => (
                    <div className="relative h-full w-full bg-gray-100" key={index}>
                         <div className="h-[10%] flex items-center justify-between bg-white p-3 border-gray-100 border-b-2">
                              <div className="flex items-center">
                                   <div className="flex items-end">
                                        <Avatar url={item.avatar} size="h-12 w-12" sx={`${!item.active && "mr-2"}`} />
                                        {item.active && <Ping sx="right-3" />}
                                   </div>

                                   <div className="ml-1">
                                        <p className="font-bold">
                                             {item.lastName} {item.firstName}
                                        </p>
                                        {item.active ? (
                                             <p>Đang hoạt động</p>
                                        ) : (
                                             <div className="flex">
                                                  <div className="mr-1">Hoạt động:</div>
                                                  <OfflineTimeCounter lastLoggedInTime={item.lastLoggedInTime} />
                                                  <div className="ml-1">trước</div>
                                             </div>
                                        )}
                                   </div>
                              </div>
                              <div className="w-28 flex justify-between text-green-600 text-3xl">
                                   <IoCall className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" />
                                   <BsFillCameraVideoFill className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" />
                                   <HiDotsCircleHorizontal className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" />
                              </div>
                         </div>
                         <Scrollbar messageEl={messageEl} sx="h-auto">
                              <ChatContent userFriend={item} chatArray={chatArray} currentUser={currentUser} />
                         </Scrollbar>
                         <div className="absolute bottom-0 h-auto w-full flex items-center justify-center bg-white px-5 py-4 overflow-auto">
                              <BiImageAdd className="text-2xl mr-2 cursor-pointer text-green-700 hover:text-green-500" />
                              <div contentEditable suppressContentEditableWarning={true} onFocus={handlePlaceHolder} onBlur={() => setPlaceHolder(true)} className={`w-full max-h-40 overflow-auto p-3 text-sm ${placeHolder && "text-gray-400"} rounded-lg border-2 border-gray-100 bg-gray-100 focus:border-2 focus:border-green-600 focus:outline-0`} onInput={handleChange}>
                                   {values === "" && placeHolder && "Aa"}
                              </div>
                              <div className="flex items-center pl-3 text-green-700">
                                   <BiImageAdd className="text-2xl mr-2 cursor-pointer hover:text-green-500" />
                                   {values.length > 0 && <IoSend className="text-xl cursor-pointer hover:text-green-500" onClick={() => handleChat(item)} />}
                              </div>
                         </div>
                    </div>
               ))}
          </div>
     );
}
