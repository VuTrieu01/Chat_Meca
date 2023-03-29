import React from "react";
import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function Settings(props) {
  const { logOut } = useAuth();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      ref={props.event}
      className="absolute top-[-4.3rem] left-8 w-56 bg-white py-2 rounded-lg drop-shadow-2xl"
    >
      <div
        className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
        onClick={props.onClick}
      >
        <FiUser />
        <div className="ml-2">Thông tin tài khoản</div>
      </div>
      <div
        className="flex items-center border-b-2  p-2 hover:bg-gray-100 cursor-pointer"
        onClick={props.onClick}
      >
        <AiOutlineSetting />
        <div className="ml-2">Cài đặt</div>
      </div>
      <div
        className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
        onClick={handleLogOut}
      >
        <AiOutlineLogout />
        <div className="ml-2">Đăng xuất</div>
      </div>
    </div>
  );
}
