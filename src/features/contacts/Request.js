import React from "react";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";

export default function Request() {
  return (
    <div className="w-full bg-white px-5 py-4 rounded-md">
      <div className="flex">
        <Avatar sx="cursor-pointer" />
        <div className="ml-2">
          <p className="w-36 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
            Tên
          </p>
          <p className="mb-1">2 bạn chung</p>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <Button sx="mr-2 bg-green-500 hover:bg-green-600 xl:w-[50%] xl:text-[72%]">
          Xác nhận
        </Button>
        <Button sx="bg-gray-400 hover:bg-gray-500 w-[45%]">Xóa</Button>
      </div>
    </div>
  );
}
