import React, { useRef, useState } from "react";
import Avatar from "../../components/Avatar";
import Ping from "../../components/Ping";
import { IoCall, IoSend } from "react-icons/io5";
import { BsEmojiSmile, BsFillCameraVideoFill } from "react-icons/bs";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { BiImageAdd } from "react-icons/bi";
import Scrollbar from "../../components/Scrollbar";
import ChatContent from "./ChatContent";
import OfflineTimeCounter from "../../components/OfflineTimeCounter";
import { uid } from "uid";
import { child, ref, set, update } from "firebase/database";
import { getDownloadURL, ref as refImg, uploadBytesResumable } from "firebase/storage";
import { database, storage } from "../../firebase";
import useStore from "../../zustand/store";
import Picker from "emoji-picker-react";
import "./style.css";

export default function Conversations({ userFriend, currentUser, dbRef, chatArray, dataGroup, chatGroup, memberGroup, openDetail, setOpenDetail }) {
     const uuid = uid();
     const uuidImg = uid();
     const messageEl = useRef(null);
     const file = useRef(null);
     const [values, setValues] = useState("");
     const [showEmoji, setShowEmoji] = useState(false);
     const setActiveSidebar = useStore((state) => state.setActiveSidebar);
     const setOpenChatItem = useStore((state) => state.setOpenChatItem);
     const lastLoggedInTime = new Date();
     const groupName = {
          smileys_people: "Mặt cười & hình người",
          animals_nature: "Động vật & thiên nhiên",
          food_drink: "Ẩm thực",
          travel_places: "Đi lại & địa điểm",
          activities: "Hoạt động",
          objects: "Đồ vật",
          symbols: "Biểu tượng",
          flags: "Cờ",
          recently_used: "Đề xuất",
     };
     const handleChange = (e) => {
          setValues(e.target.value);
     };
     const handleShowEmoji = () => {
          setShowEmoji(!showEmoji);
     };
     const handleEmojiClick = (e, emoji) => {
          let msg = values;
          msg += emoji.emoji;
          setValues(msg);
     };
     const handleDetail = () => {
          setOpenDetail(!openDetail);
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
          if (file.current.files[0] !== undefined) {
               const img = file.current.files[0];
               const storageRef = refImg(storage, uuidImg);
               const uploadImg = uploadBytesResumable(storageRef, img);
               uploadImg.on(
                    (error) => {
                         console.log(error);
                    },
                    () => {
                         getDownloadURL(uploadImg.snapshot.ref).then(async (downloadURL) => {
                              await set(ref(database, `Chat/${currentUser.uid}/${item.uid}/${uuid}`), {
                                   uid: uuid,
                                   accountId: currentUser.uid,
                                   accountFriendId: item.uid,
                                   newText: true,
                                   img: downloadURL,
                                   lastLoggedInTime: lastLoggedInTime.getTime(),
                              });
                         });
                    }
               );
          } else {
               set(ref(database, `Chat/${currentUser.uid}/${item.uid}/${uuid}`), {
                    uid: uuid,
                    accountId: currentUser.uid,
                    accountFriendId: item.uid,
                    newText: true,
                    chat: values,
                    lastLoggedInTime: lastLoggedInTime.getTime(),
               });
          }
          setValues("");
          file.current.value = "";
          setActiveSidebar(0);
          setOpenChatItem(item.uid);
     };
     const handleChatGroup = (item) => {
     const memberIdGroup = dataGroup.leaderId !== currentUser.uid ? [dataGroup.leaderId, ...dataGroup.memberId.filter((it) => it !== currentUser.uid)] : [...dataGroup.memberId.filter((it) => it !== currentUser.uid)]
          // chatArray.map((upItem) => {
          //      if (upItem.accountId === item.uid && upItem.accountFriendId.includes(currentUser.uid) && upItem.newText === true) {
          //           update(child(dbRef, `Chat/${item.uid}/${currentUser.uid}/${upItem.uid}`), {
          //                newText: false,
          //           });
          //      }
          //      return null;
          // });
          if (file.current.files[0] !== undefined) {
               const img = file.current.files[0];
               const storageRef = refImg(storage, uuidImg);
               const uploadImg = uploadBytesResumable(storageRef, img);
               uploadImg.on(
                    (error) => {
                         console.log(error);
                    },
                    () => {
                         getDownloadURL(uploadImg.snapshot.ref).then(async (downloadURL) => {
                              await set(ref(database, `Chat/${item.uid}/${uuid}`), {
                                   uid: uuid,
                                   groupId: item.uid,
                                   accountFriendId: currentUser.uid,
                                   unReadUser: memberIdGroup,
                                   img: downloadURL,
                                   lastLoggedInTime: lastLoggedInTime.getTime(),
                              });
                         });
                    }
               );
          } else {
               set(ref(database, `Chat/${item.uid}/${uuid}`), {
                    uid: uuid,
                    groupId: item.uid,
                    accountFriendId: currentUser.uid,
                    unReadUser: memberIdGroup,
                    chat: values,
                    lastLoggedInTime: lastLoggedInTime.getTime(),
               });
          }
          setValues("");
          file.current.value = "";
          setActiveSidebar(0);
          setOpenChatItem(item.uid);
     };
     return (
          <div className="h-screen w-full">
               {!dataGroup &&
                    userFriend.map((item, index) => (
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
                                                       <div className="mr-1">Hoạt động</div>
                                                       <OfflineTimeCounter lastLoggedInTime={item.lastLoggedInTime} />
                                                       <div className="ml-1">trước</div>
                                                  </div>
                                             )}
                                        </div>
                                   </div>
                                   <div className="w-28 flex justify-between text-green-600 text-3xl">
                                        <IoCall className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" />
                                        <BsFillCameraVideoFill className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" />
                                        <HiDotsCircleHorizontal className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" onClick={handleDetail} />
                                   </div>
                              </div>
                              <Scrollbar messageEl={messageEl} sx="h-auto">
                                   <ChatContent userFriend={item} chatArray={chatArray} currentUser={currentUser} />
                              </Scrollbar>
                              <div className=" absolute bottom-0 h-auto w-full flex items-center justify-center bg-white px-5 py-4 overflow-auto">
                                   <BsEmojiSmile onClick={handleShowEmoji} className="text-2xl mr-2 cursor-pointer text-green-700 hover:text-green-500" />
                                   <textarea className="w-full h-12 overflow-auto p-3 text-sm rounded-lg border-2 border-gray-100 bg-gray-100 focus:border-2 focus:border-green-600 focus:outline-0 resize-none" placeholder="Aa" value={values} onChange={handleChange} />
                                   <div className="flex items-center pl-3 text-green-700">
                                        <input type="file" accept="image/png, image/jpeg" className="hidden" id="add-img" ref={file} onChange={() => handleChat(item)} />
                                        <label htmlFor="add-img">
                                             <BiImageAdd className="text-2xl mr-2 cursor-pointer hover:text-green-500" />
                                        </label>
                                        {values.length > 0 && <IoSend className="text-xl cursor-pointer hover:text-green-500" onClick={() => handleChat(item)} />}
                                   </div>
                              </div>
                              {showEmoji && <Picker onEmojiClick={handleEmojiClick} groupNames={groupName} />}
                         </div>
                    ))}
               {dataGroup && (
                    <div className="relative h-full w-full bg-gray-100">
                         <div className="h-[10%] flex items-center justify-between bg-white p-3 border-gray-100 border-b-2">
                              <div className="flex items-center">
                                   <div className="flex items-end">
                                        <Avatar url={dataGroup.avatarURL} size="h-12 w-12" />
                                   </div>

                                   <div className="ml-1">
                                        <p className="font-bold">{dataGroup.name}</p>
                                   </div>
                              </div>
                              <div className="w-28 flex justify-between text-green-600 text-3xl">
                                   <IoCall className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" />
                                   <BsFillCameraVideoFill className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" />
                                   <HiDotsCircleHorizontal className="cursor-pointer w-24 p-1 rounded-full hover:bg-gray-100" onClick={handleDetail} />
                              </div>
                         </div>
                         <Scrollbar messageEl={messageEl} sx="h-auto">
                              <ChatContent memberGroup={memberGroup} chatGroup={chatGroup} currentUser={currentUser} />
                         </Scrollbar>
                         <div className=" absolute bottom-0 h-auto w-full flex items-center justify-center bg-white px-5 py-4 overflow-auto">
                              <BsEmojiSmile onClick={handleShowEmoji} className="text-2xl mr-2 cursor-pointer text-green-700 hover:text-green-500" />
                              <textarea className="w-full h-12 overflow-auto p-3 text-sm rounded-lg border-2 border-gray-100 bg-gray-100 focus:border-2 focus:border-green-600 focus:outline-0 resize-none" placeholder="Aa" value={values} onChange={handleChange} />
                              <div className="flex items-center pl-3 text-green-700">
                                   <input type="file" accept="image/png, image/jpeg" className="hidden" id="add-img" ref={file} onChange={() => handleChatGroup(dataGroup)} />
                                   <label htmlFor="add-img">
                                        <BiImageAdd className="text-2xl mr-2 cursor-pointer hover:text-green-500" />
                                   </label>
                                   {values.length > 0 && <IoSend className="text-xl cursor-pointer hover:text-green-500" onClick={() => handleChatGroup(dataGroup)} />}
                              </div>
                         </div>
                         {showEmoji && <Picker onEmojiClick={handleEmojiClick} groupNames={groupName} />}
                    </div>
               )}
          </div>
     );
}
