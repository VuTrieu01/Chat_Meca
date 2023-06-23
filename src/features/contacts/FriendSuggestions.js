import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import Scrollbar from "../../components/Scrollbar";
import Avatar from "../../components/Avatar";
import Ping from "../../components/Ping";

const FriendSuggestions = ({ openFriendSuggestions, closeFriendSuggestions, data, getDataFriends, accounts }) => {
     const handleClose = () => {
          closeFriendSuggestions();
     };
     const userFriend = accounts.filter((val) => getDataFriends(data.uid).includes(val.uid));
     console.log(userFriend);
     return (
          <div>
               <div className={`fixed ${openFriendSuggestions} z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60`}></div>
               <div className={`fixed ${openFriendSuggestions} z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 bg-white rounded-md px-8 py-6 drop-shadow-lg`}>
                    <div className="flex justify-end">
                         <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-full" onClick={handleClose}>
                              <IoCloseSharp />
                         </div>
                    </div>
                    <div className="text-lg font-bold mb-2">Danh sách bạn bè chung</div>
                    <Scrollbar height="h-[30rem]" sx="mr-1">
                         {userFriend.map((item, index) => (
                              <div key={index} className="flex justify-between items-center w-full bg-white py-2">
                                   <div className="flex items-center">
                                        <div className="flex items-end">
                                             <Avatar url={item.avatar} size="h-12 w-12" sx={`${!item.active && "mr-2"}`} />
                                             {item.active && <Ping sx="right-3" />}
                                        </div>
                                        <div>
                                             <p className="w-36 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                                  {item.lastName} {item.firstName}
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </Scrollbar>
               </div>
          </div>
     );
};

export default FriendSuggestions;
