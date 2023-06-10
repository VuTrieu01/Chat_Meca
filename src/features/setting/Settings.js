import { child, ref, update } from "firebase/database";
import React, { useRef } from "react";
import { AiOutlineLogout, AiFillSetting } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { database } from "../../firebase";
import { useEffect } from "react";
import { MdPersonRemove } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export default function Settings({ setOpen, openUserForm, sx, friends, setOpenMessenger }) {
     const dbRef = ref(database);
     const menuRef = useRef(null);
     const { logOut, currentUser } = useAuth();
     const lastLoggedInTime = new Date();
     const handleOpenUserForm = () => {
          openUserForm();
          setOpen(false);
     };
     const handleChangeSetting = () => {
          setOpen(false);
     };
     const handleLogOut = async () => {
          update(child(dbRef, `Account/${currentUser.uid}`), {
               active: false,
               lastLoggedInTime: lastLoggedInTime.getTime(),
          });
          try {
               await logOut();
          } catch (e) {
               console.log(e);
          }
     };
     useEffect(() => {
          function handleClickOutside(event) {
               if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setOpen(false);
               }
          }
          document.addEventListener("click", handleClickOutside, true);
          return () => {
               document.removeEventListener("click", handleClickOutside, true);
          };
     }, [menuRef]);
     const handleDelete = () => {
          setOpenMessenger("");
     };
     return (
          <div ref={menuRef} className={`absolute ${sx ? sx : "top-[-4.3rem] left-8"} w-56 bg-white py-2 rounded-lg drop-shadow-2xl`}>
               <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer" onClick={handleOpenUserForm}>
                    <FaUser className="text-green-800" />
                    <div className="ml-2">{friends ? "Xem thông tin" : "Thông tin tài khoản"}</div>
               </div>
               {friends ? (
                    <div className="flex items-center border-t-2 p-2 hover:bg-gray-100 cursor-pointer" onClick={handleDelete}>
                         <MdPersonRemove className="w-6 h-6 text-red-700" />
                         <div className="ml-2 text-red-700">Xóa bạn</div>
                    </div>
               ) : (
                    <>
                         <div className="flex items-center border-b-2  p-2 hover:bg-gray-100 cursor-pointer" onClick={handleChangeSetting}>
                              <AiFillSetting className="w-5 h-5 text-green-800" />
                              <div className="ml-2">Cài đặt</div>
                         </div>
                         <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogOut}>
                              <AiOutlineLogout className="text-green-800" />
                              <div className="ml-2">Đăng xuất</div>
                         </div>
                    </>
               )}
          </div>
     );
}
