import React, { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import Ping from "../../components/Ping";
import useStore from "../../zustand/store";
import UserForm from "../user/UserForm";
import { BsThreeDots } from "react-icons/bs";
import Settings from "../setting/Settings";
import MessengerBox from "../../components/MessengerBox";

export default function Friend({ accounts, friends, currentUser, userArray, getCommonFriendsCount }) {
     const setOpenChat = useStore((state) => state.setOpenChat);
     const [open, setOpen] = useState(false);
     const [openUser, setOpenUser] = useState("hidden");
     const [id, setId] = useState(-1);
     const [openMessenger, setOpenMessenger] = useState("hidden");
     const addUserFriend = useStore((state) => state.addUserFriend);
     const userFriend = accounts.filter((val) => friends.status === true && friends.accountId.includes(val.uid));
     const openUserForm = (id) => {
          setId(id);
          setOpen(!open);
     };
     const closeUserForm = () => {
          setOpenUser("hidden");
     };
     const handleClick = (item) => {
          addUserFriend(item);
          setOpenChat(true);
     };
     return (
          <>
               {userFriend.map((item, index) => {
                    const count = getCommonFriendsCount(item.uid);
                    return (
                         <div key={index} className="flex justify-between items-center w-full bg-white px-5 py-4 hover:bg-gray-100">
                              <div onClick={() => handleClick(item)} className="flex items-center w-full cursor-pointer">
                                   <div className="flex items-end">
                                        <Avatar url={item.avatar} size="h-12 w-12" sx={`${!item.active && "mr-2"}`} />
                                        {item.active && <Ping sx="right-3" />}
                                   </div>
                                   <div>
                                        <p className="w-36 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                             {item.lastName} {item.firstName}
                                        </p>
                                        <p className="mb-1">{count} bạn chung</p>
                                   </div>
                              </div>
                              <div onClick={() => openUserForm(index)} className="relative hover:bg-gray-200 p-1 rounded-full cursor-pointer">
                                   <BsThreeDots />
                                   {open && <Settings setOpen={setOpen} openUserForm={() => setOpenUser("")} sx="right-1 z-40" friends={friends} setOpenMessenger={setOpenMessenger} />}
                              </div>
                              {id === index && (
                                   <>
                                        <UserForm openUser={openUser} closeUserForm={closeUserForm} data={item} />
                                        <MessengerBox currentUser={currentUser} currentUserFriend={item} dataFriends={userArray} openMessenger={openMessenger} closeMessenger={setOpenMessenger} />
                                   </>
                              )}
                         </div>
                    );
               })}
          </>
     );
}
