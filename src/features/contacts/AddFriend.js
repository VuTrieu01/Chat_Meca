import React, { useState } from "react";
import { FiUserPlus, FiUserX } from "react-icons/fi";
import SearchInput from "../../components/SearchInput";
import Scrollbar from "../../components/Scrollbar";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import { uid } from "uid";
import { ref, set } from "firebase/database";
import { database } from "../../firebase";
import { AiOutlineSearch } from "react-icons/ai";
import UserForm from "../user/UserForm";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export default function AddFriend({ currentUser, accounts, friends, getCommonFriendsCount }) {
     const uuid = uid();
     const [search, setSearch] = useState("");
     const [openUser, setOpenUser] = useState("hidden");
     const [openSendFriends, setSendFriends] = useState("");
     const [id, setId] = useState(-1);
     const openUserForm = (id) => {
          setId(id);
          setOpenUser("");
     };
     const closeUserForm = () => {
          setOpenUser("hidden");
     };
     const friendsArray = Object.values(friends)
          .flatMap((obj) => Object.values(obj))
          .filter((val) => val.accountId === currentUser.uid || val.accountFriendId === currentUser.uid);
     const user = accounts.filter((val) => val.uid !== currentUser.uid && !friendsArray.map((item) => item.accountFriendId).includes(val.uid) 
                    && !friendsArray.map((item) => item.accountId).includes(val.uid));
     const friendSuggestions = accounts.filter((val) => val.uid !== currentUser.uid && !friendsArray.map((item) => item.accountFriendId).includes(val.uid) 
                              && !friendsArray.map((item) => item.accountId).includes(val.uid) && getCommonFriendsCount(val.uid) > 0);
     const searchData = search !== "" && user.filter((val) => (val.lastName + " " + val.firstName).toLowerCase().includes(search.toLowerCase()));
     const handleChange = (e) => {
          if (e.target) setSearch(e.target.value);
     };
     const handleAddFriend = (item) => {
          try {
               set(ref(database, `Friends/${currentUser.uid}/${uuid}`), {
                    uid: uuid,
                    accountId: currentUser.uid,
                    accountFriendId: item.uid,
                    status: false,
               })
                    .then(() => {
                         console.log("Success");
                    })
                    .catch((error) => {
                         console.log(error);
                    });
          } catch (e) {
               console.log(e);
          }
     };
     return (
          <div className="h-full w-full">
               <div className="h-full w-full bg-gray-100">
                    <div className="flex items-center justify-between bg-white p-6 border-gray-100 border-b-2">
                         <div className="flex items-center">
                              <FiUserPlus className="text-2xl" />
                              <div className="ml-4 font-bold">Thêm bạn bè</div>
                         </div>
                    </div>
                    <div className="w-full py-[0.43rem] px-6 bg-white border-gray-100 border-b-2">
                         <SearchInput sx="w-2/5" placeholder="Tìm kiếm bạn bè" value={search} onChange={handleChange} />
                    </div>
                    <Scrollbar sx="px-5">
                         {!searchData ? (
                              <>
                                   <div className="h-40 flex flex-col items-center justify-center">
                                        <AiOutlineSearch className="text-5xl" />
                                        <div>Tìm kiếm bạn bè</div>
                                   </div>
                                   <div className="flex items-center w-full pb-4 border-gray-100 border-b-2">
                                        <div className="font-bold mr-1">Gợi ý kết bạn({friendSuggestions.length})</div>
                                        {friendSuggestions.length > 0 && (
                                             <>
                                                  {friendSuggestions.length > 8 || openSendFriends === "hidden" ? (
                                                       <div className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                            <IoMdArrowDropdown onClick={() => setSendFriends("")} />
                                                       </div>
                                                  ) : (
                                                       <div className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                            <IoMdArrowDropup onClick={() => setSendFriends("hidden")} />
                                                       </div>
                                                  )}
                                             </>
                                        )}
                                   </div>
                                   <div className={`${friendSuggestions.length > 8 || openSendFriends === "hidden" ? openSendFriends : ""} grid-cols-1 grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4`}>
                                        {friendSuggestions.map((item, index) => {
                                             const count = getCommonFriendsCount(item.uid);
                                             return (
                                                  <div className="w-full bg-white px-5 py-4 rounded-md" key={index}>
                                                       <div className="flex">
                                                            <Avatar url={item.avatar} size="h-12 w-12" sx="cursor-pointer" onClick={() => openUserForm(index)} />
                                                            {id === index && <UserForm openUser={openUser} closeUserForm={closeUserForm} data={item} editUser />}
                                                            <div className="ml-2">
                                                                 <p className="w-36 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                                                      {item.lastName} {item.firstName}
                                                                 </p>
                                                                 <p className="mb-1">{count} bạn chung</p>
                                                            </div>
                                                       </div>
                                                       <div className="flex justify-end w-full">
                                                            <Button sx="mr-2 bg-green-500 hover:bg-green-600" onClick={() => handleAddFriend(item)}>
                                                                 Kết bạn
                                                            </Button>
                                                       </div>
                                                  </div>
                                             );
                                        })}
                                   </div>
                              </>
                         ) : searchData.length === 0 ? (
                              <div className="h-40 flex flex-col items-center justify-center py-44">
                                   <FiUserX className="text-5xl" />
                                   <div>Không tìm thấy người dùng này</div>
                              </div>
                         ) : (
                              <div className="grid-cols-1 grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
                                   {searchData.map((item, index) => {
                                        const count = getCommonFriendsCount(item.uid);
                                        return (
                                             <div className="w-full bg-white px-5 py-4 rounded-md" key={index}>
                                                  <div className="flex">
                                                       <Avatar url={item.avatar} size="h-12 w-12" sx="cursor-pointer" onClick={() => openUserForm(index)} />
                                                       {id === index && <UserForm openUser={openUser} closeUserForm={closeUserForm} data={item} editUser />}
                                                       <div className="flex flex-col justify-center ml-2">
                                                            <p className="w-36 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                                                 {item.lastName} {item.firstName}
                                                            </p>
                                                            {count > 0 && <p className="mb-1">{count} bạn chung</p>}
                                                       </div>
                                                  </div>
                                                  <div className="flex justify-end w-full">
                                                       <Button sx="mr-2 bg-green-500 hover:bg-green-600" onClick={() => handleAddFriend(item)}>
                                                            Kết bạn
                                                       </Button>
                                                  </div>
                                             </div>
                                        );
                                   })}
                              </div>
                         )}
                    </Scrollbar>
               </div>
          </div>
     );
}
