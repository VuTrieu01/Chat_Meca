import React from "react";
import Avatar from "../../components/Avatar";
export default function Friend() {
  return (
    <div className="flex items-center w-full bg-white px-5 py-4 cursor-pointer hover:bg-gray-100">
      <Avatar />
      <div className="ml-2">
        <p className="font-bold">Tên</p>
        <p>2 bạn chung</p>
      </div>
    </div>
  );
}
