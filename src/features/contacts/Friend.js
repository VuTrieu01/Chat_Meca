import React, { useState } from "react";
import Avatar from "../../components/Avatar";
import Ping from "../../components/Ping";
import useStore from "../../zustand/store";
import UserForm from "../user/UserForm";
import { BsThreeDots } from "react-icons/bs";
import Settings from "../setting/Settings";
import MessengerBox from "../../components/MessengerBox";

export default function Friend({ accounts, friends, currentUser, userArray }) {
     const setOpenChat = useStore((state) => state.setOpenChat);
     const [open, setOpen] = useState(false);
     const [openUser, setOpenUser] = useState("hidden");
     const [id, setId] = useState(-1);
     const [openMessenger, setOpenMessenger] = useState("hidden");
     const addProvisionalDataAccount = useStore((state) => state.addProvisionalDataAccount);
     const userFriend = accounts.filter((val) => friends.status === true && friends.accountId.includes(val.uid));
     const openUserForm = (id) => {
          setId(id);
          setOpen(!open);
     };
     const closeUserForm = () => {
          setOpenUser("hidden");
     };
     const handleClick = () => {
          addProvisionalDataAccount(accounts);
          setOpenChat(true);
     };
     return (
          <>
               {userFriend.map((item, index) => (
                    <div key={index} className="flex justify-between items-center w-full bg-white px-5 py-4 hover:bg-gray-100">
                         <div onClick={handleClick} className="flex items-center w-full cursor-pointer">
                              <div className="flex items-end">
                                   <Avatar url={item.avatar} size="h-12 w-12" sx={`${!item.active && "mr-2"}`} />
                                   {item.active && <Ping sx="right-3" />}
                              </div>
                              <div>
                                   <p className="font-bold">
                                        {item.lastName} {item.firstName}
                                   </p>
                                   <p>2 bạn chung</p>
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
               ))}
          </>
     );
}
