import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import TextField from "../../components/TextField";
import SearchInput from "../../components/SearchInput";
import Scrollbar from "../../components/Scrollbar";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import { FiUserX } from "react-icons/fi";
import { child, onValue, ref, set } from "firebase/database";
import { database } from "../../firebase";
import { uid } from "uid";
const GroupForm = ({ openGroupForm, closeGroupForm, accounts, chatArray, currentUser }) => {
     const [friends, setFriends] = useState([]);
     const [listId, setListId] = useState([]);
     const [name, setName] = useState("");
     const [search, setSearch] = useState("");
     const uuid = uid();
     const dbRef = ref(database);
     const friendsArray = Object.values(friends).flatMap((obj) => Object.values(obj));
     const user = accounts.filter((val) => !listId.includes(val.uid) &&
          friendsArray
               .filter((val) => val.accountId === currentUser.uid && val.status === true)
               .map((item) => item.accountFriendId)
               .includes(val.uid)
     );
     const user2 = accounts.filter(
          (val) =>
          !listId.includes(val.uid) &&
               val.accountId !== currentUser.uid &&
               !friendsArray
                    .filter((val) => val.accountId === currentUser.uid && val.status === true)
                    .map((item) => item.accountFriendId)
                    .includes(val.uid)
     );
     const searchData = search !== "" && user.filter((val) => (val.lastName + " " + val.firstName).toLowerCase().includes(search.toLowerCase()));
     const searchData2 = user2.filter((val) => (val.lastName + " " + val.firstName).toLowerCase().includes(search.toLowerCase()));
     const handleChange = (e) => {
          if (e.target) setSearch(e.target.value);
     };
     const closeUpload = () => {
          setListId([]);
          setName("");
          closeGroupForm("hidden");
     };
     const handleListUserId = (id) => {
          setListId([...listId, id]);
     }
     const handleDeleteUserId = (id) => {
          const filterId = listId.filter((val) => val !== id);
          setListId(filterId);
     }
     const handleChangeName = (e) => {
          setName(e.target.value);
     }
     const handleSubmit = () => {
          try {
               set(ref(database, `Group/${uuid}`), {
                    uid: uuid,
                    avatarURL: "",
                    name: name,
                    memberId: listId,
                    leaderId: currentUser.uid,
               })
                    .then(() => {
                         closeUpload();
                         console.log("Success");
                    })
                    .catch((error) => {
                         console.log(error);
                    });
          } catch (e) {
               console.log(e);
          }
     }
     useEffect(() => {
          onValue(child(dbRef, `Friends`), (snapshot) => {
               setFriends([]);
               const data = snapshot.val();
               if (data !== null) {
                    Object.values(data).map((item) => {
                         return setFriends((oldArray) => [...oldArray, item]);
                    });
               }
          });
     }, [dbRef]);
     return (
          <div>
               <div className={`fixed ${openGroupForm} z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60`}></div>
               <div className={`fixed ${openGroupForm} z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 bg-white rounded-md py-4 drop-shadow-lg`}>
                    <div className="flex justify-between pb-4 mb-4 px-8 border-gray-100 border-b-2">
                         <div className="text-lg font-bold">Tạo nhóm</div>
                         <div className="cursor-pointer hover:bg-gray-200 p-1 rounded-full" onClick={closeUpload}>
                              <IoCloseSharp />
                         </div>
                    </div>
                    <div className="px-8">
                         <TextField type="text" placeholder="Tên nhóm (Bắt buộc)" sx="w-80 md:w-full mb-4" value={name} onChange={handleChangeName} />
                         <div className="text-sm mb-2 font-bold">Thêm thành viên</div>
                         <SearchInput value={search} onChange={handleChange} />
                         <div className="flex items-start pt-4 mb-1 select-none scrollbarX focus:scroll-smooth overflow-y-hidden whitespace-nowrap">
                              {accounts.filter((val) => listId.includes(val.uid)).map((item, index) => (
                                   <div key={index} className="relative flex flex-col items-center mr-4">
                                        <Avatar url={item.avatar} size="h-10 w-10" />
                                        <p className="text-sm">{item.firstName}</p>
                                        <div onClick={() => handleDeleteUserId(item.uid)} className="absolute -top-2 -right-1 text-sm bg-white shadow-inner border-black cursor-pointer hover:bg-gray-200 p-[2px] rounded-full">
                                             <IoCloseSharp />
                                        </div>
                                   </div>
                              ))}
                         </div>
                         <Scrollbar height="h-80">
                              <>
                                   {!searchData ? (
                                        <>
                                             <div className="mb-2">Gợi ý</div>
                                             {user.map((item, index) => (
                                                  <div onClick={() => handleListUserId(item.uid)} key={index} className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-100">
                                                       <Avatar url={item.avatar} size="h-10 w-10" />
                                                       <div className="ml-2">
                                                            <p className="w-36 text-sm font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                                                 {item.lastName} {item.firstName}
                                                            </p>
                                                       </div>
                                                  </div>
                                             ))}
                                        </>
                                   ) : searchData.length > 0 || searchData2.length > 0 ? (
                                        <>
                                             {searchData.map((item, index) => (
                                                  <div onClick={() => handleListUserId(item.uid)} className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-100" key={index}>
                                                       <Avatar url={item.avatar} size="h-10 w-10" />
                                                       <div className="ml-2">
                                                            <p className="w-36 text-sm font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                                                 {item.lastName} {item.firstName}
                                                            </p>
                                                       </div>
                                                  </div>
                                             ))}
                                             {searchData2.length > 0 && <div className="mb-2">Những người khác</div>}
                                             {searchData2.map((item, index) => (
                                                  <div onClick={() => handleListUserId(item.uid)} className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-100" key={index}>
                                                       <Avatar url={item.avatar} size="h-10 w-10" />
                                                       <div className="ml-2">
                                                            <p className="w-36 text-sm font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                                                 {item.lastName} {item.firstName}
                                                            </p>
                                                       </div>
                                                  </div>
                                             ))}
                                        </>
                                   ) : (
                                        <div className="h-40 flex flex-col items-center justify-center">
                                             <FiUserX className="h-10 w-10" />
                                             <div>Không tìm thấy người dùng này</div>
                                        </div>
                                   )}
                              </>
                         </Scrollbar>
                    </div>
                    <div className="flex justify-end pt-4 px-8 border-gray-100 border-t-2">
                         <Button onClick={handleSubmit} sx={`${listId.length > 0 && name.length > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 opacity-80 shadow-none hover:bg-gray-400 hover:shadow-none"}`} disabled={listId.length > 0 && name.length > 0 ? false : true}>Tạo nhóm</Button>
                    </div>
               </div>
          </div>
     );
};

export default GroupForm;
