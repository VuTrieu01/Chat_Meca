import { child, ref, remove, set, update } from "firebase/database";
import React from "react";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import { database } from "../../firebase";
import { uid } from "uid";
import UserForm from "../user/UserForm";
import { useState } from "react";

export default function Request({ accounts, friends, sendFriends, getCommonFriendsCount }) {
     const dbRef = ref(database);
     const uuid = uid();
     const userFriend = sendFriends ? accounts.filter((val) => sendFriends.status === false && sendFriends.accountFriendId.includes(val.uid)) : accounts.filter((val) => friends.status === false && friends.accountId.includes(val.uid));
     const [openUser, setOpenUser] = useState("hidden");
     const [id, setId] = useState(-1);
     const openUserForm = (id) => {
          setId(id);
          setOpenUser("");
     };
     const closeUserForm = () => {
          setOpenUser("hidden");
     };
     const handleAddFriend = (item) => {
          set(ref(database, `Friends/${item.accountFriendId}/${uuid}`), {
               uid: uuid,
               accountId: item.accountFriendId,
               accountFriendId: item.accountId,
               status: true,
          })
               .then(() => {
                    console.log("Success");
               })
               .catch((error) => {
                    console.log(error);
               });
          update(child(dbRef, `Friends/${item.accountId}/${item.uid}`), {
               status: true,
          });
     };
     const handleRemoveFriend = (item) => {
          remove(child(dbRef, `Friends/${item.accountId}/${item.uid}`));
     };
     return (
          <>
               {userFriend.map((item, index) => {
                     const count = getCommonFriendsCount(item.uid);
                    return (
                         <div className="w-full bg-white px-5 py-4 rounded-md" key={index}>
                              <div className="flex mb-3">
                                   <Avatar url={item.avatar} size="h-12 w-12" sx="cursor-pointer" onClick={() => openUserForm(index)} />
                                   {id === index && <UserForm openUser={openUser} closeUserForm={closeUserForm} data={item} />}
                                   <div className="flex flex-col justify-center ml-2">
                                        <p className="w-36 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                             {item.lastName} {item.firstName}
                                        </p>
                                        {count > 0 && <p className="mb-1">{count} bạn chung</p>}
                                   </div>
                              </div>
                              {sendFriends ? (
                                   <div className="flex justify-end w-full">
                                        <Button sx="bg-gray-400 hover:bg-gray-500" onClick={() => handleRemoveFriend(sendFriends)}>
                                             Thu hồi kết bạn
                                        </Button>
                                   </div>
                              ) : (
                                   <div className="flex justify-between">
                                        <Button sx="mr-2 bg-green-500 hover:bg-green-600" onClick={() => handleAddFriend(friends)}>
                                             Xác nhận
                                        </Button>
                                        <Button sx="bg-gray-400 hover:bg-gray-500 w-20" onClick={() => handleRemoveFriend(friends)}>
                                             Xóa
                                        </Button>
                                   </div>
                              )}
                         </div>
                    );
               })}
          </>
     );
}
