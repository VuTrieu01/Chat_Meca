import React, { useState } from "react";
import { AiOutlineBell, AiOutlineFileText, AiOutlineSearch } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsImages, BsThreeDots } from "react-icons/bs";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { RiFontSize } from "react-icons/ri";
import Avatar from "../../components/Avatar";
import OfflineTimeCounter from "../../components/OfflineTimeCounter";
import Ping from "../../components/Ping";
import Scrollbar from "../../components/Scrollbar";
import GroupForm from "../group/GroupForm";
import Settings from "../setting/Settings";
import UserForm from "../user/UserForm";
import MessengerBox from "../../components/MessengerBox";

export default function ConversationInfo({ userFriend, currentUser, accounts, dataGroup }) {
     const [openChangeChat, setOpenChangeChat] = useState(false);
     const [openChangeMember, setOpenChangeMember] = useState(false);
     const [openChangeFile, setOpenChangeFile] = useState(false);
     const [openGroupForm, closeGroupForm] = useState("hidden");
     const [open, setOpen] = useState(false);
     const [openUser, setOpenUser] = useState("hidden");
     const [id, setId] = useState(-1);
     const [deleteGroup, setDeleteGroup] = useState(0);
     const [openMessenger, setOpenMessenger] = useState("hidden");
     const [openMsgGroup, setOpenMsgGroup] = useState("hidden");
     const listMember = dataGroup && accounts.filter((val) => dataGroup.memberId.includes(val.uid));
     const handleOpenChangeChat = () => {
          setOpenChangeChat(!openChangeChat);
     };
     const handleOpenChangeMember = () => {
          setOpenChangeMember(!openChangeMember);
     };
     const handleOpenChangeFile = () => {
          setOpenChangeFile(!openChangeFile);
     };
     const openUserForm = (id) => {
          setId(id);
          setOpen(!open);
     };
     const openUserLeader = (id) => {
          if (dataGroup.leaderId !== currentUser.uid) {
               setId(id);
               setOpenUser("");
          }
     };
     const closeUserForm = () => {
          setOpenUser("hidden");
     };
     const handleDeleteGroup = () => {
          setOpenMsgGroup("");
          setDeleteGroup(10);
     }
     return (
          <div className="h-full w-2/5 bg-white">
               {!dataGroup &&
                    userFriend.map((item, index) => (
                         <div className="h-full border-gray-100 border-l-2" key={index}>
                              <div className="w-full flex flex-col items-center">
                                   <div className="mb-[-4px] mt-2">
                                        <Avatar url={item.avatar} size="h-20 w-20" />
                                        {item.active && <Ping sx="left-[3.8rem] bottom-4" />}
                                   </div>
                                   <div className="text-center">
                                        <p className="font-bold text-xl">
                                             {item.lastName} {item.firstName}
                                        </p>
                                        {item.active ? (
                                             <p>Đang hoạt động</p>
                                        ) : (
                                             <div className="flex justify-center">
                                                  <OfflineTimeCounter lastLoggedInTime={item.lastLoggedInTime} />
                                                  <div className="ml-1">trước</div>
                                             </div>
                                        )}
                                   </div>
                                   <div className="flex mt-5">
                                        <div className="w-24 flex flex-col items-center">
                                             <BiUserCircle className="rounded-full bg-gray-100 p-1 text-4xl cursor-pointer hover:bg-gray-200" />
                                             <p className="text-center font-medium text-sm text-gray-500">Trang cá nhân</p>
                                        </div>
                                        <div className="w-24 flex flex-col items-center">
                                             <AiOutlineSearch className="rounded-full bg-gray-100 p-1 text-4xl cursor-pointer hover:bg-gray-200" />
                                             <p className="text-center font-medium text-sm text-gray-500">Tìm kiếm</p>
                                        </div>
                                   </div>
                                   <div className="w-full font-bold mt-6">
                                        <div className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer" onClick={handleOpenChangeChat}>
                                             <div>Tùy chỉnh đoạn chat</div>
                                             {openChangeChat ? <MdArrowDropUp /> : <MdArrowDropDown />}
                                        </div>
                                        {openChangeChat ? (
                                             <>
                                                  <div className="w-full flex items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer">
                                                       <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                                                       <div className="ml-2">Đổi chủ đề</div>
                                                  </div>
                                                  <div className="w-full flex items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer">
                                                       <RiFontSize className="text-lg" />
                                                       <div className="ml-2">Chỉnh sửa biệt danh</div>
                                                  </div>
                                             </>
                                        ) : (
                                             ""
                                        )}
                                        <div className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer" onClick={handleOpenChangeFile}>
                                             <div>File phương tiện, file</div>
                                             {openChangeFile ? <MdArrowDropUp /> : <MdArrowDropDown />}
                                        </div>
                                        {openChangeFile ? (
                                             <>
                                                  <div className="w-full flex items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer">
                                                       <BsImages className="text-lg" />
                                                       <div className="ml-2">File phương tiện</div>
                                                  </div>
                                                  <div className="w-full flex items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer">
                                                       <AiOutlineFileText className="text-xl" />
                                                       <div className="ml-2">File</div>
                                                  </div>
                                             </>
                                        ) : (
                                             ""
                                        )}
                                   </div>
                              </div>
                         </div>
                    ))}
               {dataGroup && (
                    <div className="h-full border-gray-100 border-l-2">
                         <div className="w-full flex flex-col items-center">
                              <div className="mb-[-4px] mt-2">
                                   <Avatar url={dataGroup.avatarURL} size="h-20 w-20" />
                              </div>
                              <div className="text-center">
                                   <p className="font-bold text-xl">{dataGroup.name}</p>
                              </div>
                              <div className="flex mt-5">
                                   <div className="w-24 flex flex-col items-center">
                                        <AiOutlineSearch className="rounded-full bg-gray-100 p-1 text-4xl cursor-pointer hover:bg-gray-200" />
                                        <p className="text-center font-medium text-sm text-gray-500">Tìm kiếm</p>
                                   </div>
                              </div>
                              <div className="w-full mt-6">
                                   <div className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer" onClick={handleOpenChangeChat}>
                                        <div className="font-bold">Tùy chỉnh đoạn chat</div>
                                        {openChangeChat ? <MdArrowDropUp /> : <MdArrowDropDown />}
                                   </div>
                                   {openChangeChat ? (
                                        <>
                                             <div className="w-full flex items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer">
                                                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                                                  <div className="ml-2 font-bold">Đổi chủ đề</div>
                                             </div>
                                             <div className="w-full flex items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer">
                                                  <RiFontSize className="text-lg" />
                                                  <div className="ml-2 font-bold">Chỉnh sửa biệt danh</div>
                                             </div>
                                        </>
                                   ) : (
                                        ""
                                   )}
                                   <div className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer" onClick={handleOpenChangeMember}>
                                        <div className="font-bold">Xem thành viên</div>
                                        {openChangeMember ? <MdArrowDropUp /> : <MdArrowDropDown />}
                                   </div>
                                   {openChangeMember ? (
                                        <Scrollbar height={`${listMember.length < 5 ? "" : "h-72"}`}>
                                             <div onClick={() => closeGroupForm("")} className="text-sm font-bold rounded-lg py-4 px-4 cursor-pointer hover:bg-gray-100">
                                                  + Thêm thành viên
                                             </div>
                                             {accounts
                                                  .filter((val) => val.uid.includes(dataGroup.leaderId))
                                                  .map((item, index) => (
                                                       <div key={index}>
                                                            <div onClick={() => openUserLeader(item.uid)} className={`flex items-center py-2 px-4 rounded-lg ${item.uid !== currentUser.uid && "cursor-pointer hover:bg-gray-100"}`}>
                                                                 <div className="flex items-end">
                                                                      <Avatar url={item.avatar} size="h-10 w-10" sx={`${item.active ? "" : "mr-2"}`} />
                                                                      {item.active && <Ping sx="right-3" />}
                                                                 </div>
                                                                 <div>
                                                                      <p className="w-36 text-sm font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                                                           {item.lastName} {item.firstName}
                                                                      </p>
                                                                      <p className="mb-1 text-xs font-normal">Chủ phòng</p>
                                                                 </div>
                                                            </div>
                                                            {id === item.uid && <UserForm openUser={openUser} closeUserForm={closeUserForm} data={item} />}
                                                       </div>
                                                  ))}
                                             {listMember.map((item, index) => (
                                                  <div key={index} className={`flex justify-between items-center w-full py-2 px-4 rounded-lg ${item.uid !== currentUser.uid && "cursor-pointer hover:bg-gray-100"}`}>
                                                       <div className="flex items-center w-full">
                                                            <div className="flex items-end">
                                                                 <Avatar url={item.avatar} size="h-10 w-10" sx={`${item.active ? "" : "mr-2"}`} />
                                                                 {item.active && <Ping sx="right-3" />}
                                                            </div>
                                                            <div>
                                                                 <p className="w-36 text-sm font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                                                      {item.lastName} {item.firstName}
                                                                 </p>
                                                            </div>
                                                       </div>
                                                       {item.uid !== currentUser.uid &&  (
                                                            <div onClick={() => openUserForm(index)} className="relative hover:bg-gray-200 p-1 rounded-full cursor-pointer">
                                                                 <BsThreeDots />
                                                                 {open && id === index && <Settings setOpen={setOpen} openUserForm={() => setOpenUser("")} sx="right-1 -top-24 z-40" friends={item} setOpenMessenger={setOpenMessenger} />}
                                                            </div>
                                                       )}
                                                       {id === index && (
                                                            <>
                                                                 <UserForm openUser={openUser} closeUserForm={closeUserForm} data={item} />
                                                                 <MessengerBox currentUser={currentUser} currentUserFriend={item} deleteMember={dataGroup} openMessenger={openMessenger} closeMessenger={setOpenMessenger} />
                                                            </>
                                                       )}
                                                  </div>
                                             ))}
                                        </Scrollbar>
                                   ) : (
                                        ""
                                   )}
                                   <div className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer" onClick={handleOpenChangeFile}>
                                        <div className="font-bold">File phương tiện, file</div>
                                        {openChangeFile ? <MdArrowDropUp /> : <MdArrowDropDown />}
                                   </div>
                                   {openChangeFile ? (
                                        <>
                                             <div className="w-full flex items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer">
                                                  <BsImages className="text-lg" />
                                                  <div className="ml-2 font-bold">File phương tiện</div>
                                             </div>
                                             <div className="w-full flex items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer">
                                                  <AiOutlineFileText className="text-xl" />
                                                  <div className="ml-2 font-bold">File</div>
                                             </div>
                                        </>
                                   ) : (
                                        ""
                                   )}
                                   {dataGroup.leaderId === currentUser.uid && 
                                   <div className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer" onClick={handleDeleteGroup}>
                                        <div className="font-bold">Giải tán nhóm</div>
                                   </div>}
                                        {deleteGroup === 10 && (
                                             <MessengerBox deleteGroup={dataGroup} openMessenger={openMsgGroup} closeMessenger={setOpenMsgGroup} />
                                        )}
                              </div>
                         </div>
                    </div>
               )}
               <GroupForm addMember openGroupForm={openGroupForm} closeGroupForm={closeGroupForm} accounts={accounts} dataGroup={dataGroup} currentUser={currentUser} />
          </div>
     );
}
