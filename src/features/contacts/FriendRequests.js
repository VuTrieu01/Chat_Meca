import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FiMail, FiUserX } from "react-icons/fi";
import Scrollbar from "../../components/Scrollbar";
import Request from "./Request";

export default function FriendRequests({ currentUser, accounts, friends, getCommonFriendsCount }) {
     const [openFriendRequests, setFriendRequests] = useState("");
     const [openSendFriends, setSendFriends] = useState("");
     const friendsArray = Object.values(friends)
          .flatMap((obj) => Object.values(obj))
          .filter((val) => val.accountFriendId === currentUser.uid);
     const countFriends = friendsArray.filter((item) => item.status === false).length;
     const sendFriendsArray = Object.values(friends)
          .flatMap((obj) => Object.values(obj))
          .filter((val) => val.accountId === currentUser.uid);
     const countSendFriends = sendFriendsArray.filter((item) => item.status === false).length;
     return (
          <div className="h-full w-full">
               <div className="h-full w-full bg-gray-100">
                    <div className="flex items-center justify-between bg-white p-6 border-gray-100 border-b-2">
                         <div className="flex items-center">
                              <FiMail className="text-2xl" />
                              <div className="ml-4 font-bold">Lời mời kết bạn</div>
                         </div>
                    </div>
                    <Scrollbar height="h-[90%]" sx="mb-2">
                         {countFriends > 0 ? (
                              <>
                                   <div className="w-full flex items-center py-4 px-6 border-gray-100 border-b-2">
                                        <div className="font-bold mr-1">Lời mời kết bạn({countFriends})</div>
                                        {countFriends < 8 ? (
                                             openSendFriends === "hidden" ? (
                                                  <div onClick={() => setSendFriends("")} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                       <IoMdArrowDropdown />
                                                  </div>
                                             ) : (
                                                  <div onClick={() => setSendFriends("hidden")} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                       <IoMdArrowDropup />
                                                  </div>
                                             )
                                        ) : openSendFriends === "" ? (
                                             <div onClick={() => setSendFriends("hidden")} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                  <IoMdArrowDropup />
                                             </div>
                                        ) : (
                                             <div onClick={() => setSendFriends("")} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                  <IoMdArrowDropdown />
                                             </div>
                                        )}
                                   </div>
                                   <div className={`${countFriends > 8 ? (openSendFriends === "hidden" ? "hidden" : "") : openSendFriends === "" ? "" : "hidden"} px-5 grid-cols-1 grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4`}>
                                        {friendsArray.map((item, index) => (
                                             <Request key={index} accounts={accounts} friends={item} getCommonFriendsCount={getCommonFriendsCount} />
                                        ))}
                                   </div>
                              </>
                         ) : (
                              <div className="w-full h-40 my-10 flex flex-col items-center justify-center">
                                   <FiUserX className="text-5xl" />
                                   <div>Không có lời mời nào</div>
                              </div>
                         )}
                         <div className="flex items-center w-full py-4 px-6 border-gray-100 border-b-2">
                              <div className="font-bold mr-1">Lời mời đã gửi({countSendFriends})</div>
                              {countSendFriends > 0 && (
                                   <>
                                        {countSendFriends < 8 ? (
                                             openSendFriends === "hidden" ? (
                                                  <div onClick={() => setSendFriends("")} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                       <IoMdArrowDropdown />
                                                  </div>
                                             ) : (
                                                  <div onClick={() => setSendFriends("hidden")} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                       <IoMdArrowDropup />
                                                  </div>
                                             )
                                        ) : openSendFriends === "" ? (
                                             <div onClick={() => setSendFriends("hidden")} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                  <IoMdArrowDropup />
                                             </div>
                                        ) : (
                                             <div onClick={() => setSendFriends("")} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                  <IoMdArrowDropdown />
                                             </div>
                                        )}
                                   </>
                              )}
                         </div>
                         <div className={`${countSendFriends > 8 ? (openSendFriends === "hidden" ? "hidden" : "") : openSendFriends === "" ? "" : "hidden"} px-5 grid-cols-1 grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4`}>
                              {sendFriendsArray.map((item, index) => (
                                   <Request key={index} accounts={accounts} sendFriends={item} getCommonFriendsCount={getCommonFriendsCount} />
                              ))}
                         </div>
                    </Scrollbar>
               </div>
          </div>
     );
}
