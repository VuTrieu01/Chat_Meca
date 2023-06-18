import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import Button from "./Button";
import { child, ref, remove } from "firebase/database";
import { database } from "../firebase";

export default function MessengerBox({ currentUser, currentUserFriend, data, openMessenger, closeMessenger, dataFriends }) {
     const dbRef = ref(database);
     const handleClose = () => {
          closeMessenger("hidden");
     };
     const handleOK = () => {
          if (data) remove(child(dbRef, `Event/${data.uid}`));
          else {
               const removeUser = dataFriends.filter((val) => (val.accountId === currentUser.uid && val.accountFriendId === currentUserFriend.uid) 
               || (val.accountFriendId === currentUser.uid && val.accountId === currentUserFriend.uid));
               removeUser.map((item) => remove(child(dbRef, `Friends/${item.accountId}/${item.uid}`)));
          }
     };
     return (
          <div className={`fixed ${openMessenger} z-40 w-screen h-screen inset-0 bg-gray-900 ${dataFriends ? "bg-opacity-60" : "bg-opacity-0"}`}>
               <div className={`fixed ${openMessenger} z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-md px-6 py-2 drop-shadow-lg border border-gray-400`}>
                    <div className="flex justify-end">
                         <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-full" onClick={handleClose}>
                              <IoCloseSharp />
                         </div>
                    </div>
                    <div className="text-2xl font-semibold mb-3">Thông báo</div>
                    <p className="mb-4">{dataFriends ? `Hủy kết bạn với ${currentUserFriend.lastName} ${currentUserFriend.firstName} không?` : "Bạn có muốn xóa không?"}</p>
                    <div className="flex justify-end my-2">
                         <Button sx="bg-red-500 hover:bg-red-600 mr-4" onClick={handleOK}>
                              Có
                         </Button>
                         <Button sx="bg-green-500 hover:bg-green-600" onClick={handleClose}>
                              Không
                         </Button>
                    </div>
               </div>
          </div>
     );
}
