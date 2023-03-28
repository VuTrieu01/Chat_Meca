import React from "react";
import { FiUserPlus, FiUserX } from "react-icons/fi";
import SearchInput from "../../components/SearchInput";
import Scrollbar from "../../components/Scrollbar";
import Request from "./Request";

export default function AddFriend() {
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
          <SearchInput sx="w-2/5" placeholder="Tìm kiếm bạn bè" />
        </div>
        {/* <div className="w-full h-4/5 flex flex-col items-center justify-center">
          <FiUserX className="text-5xl" />
          <div>Không tìm thấy người dùng này</div>
        </div> */}
        <Scrollbar sx="px-5">
          <div className="w-full py-4 font-bold">Gợi ý kết bạn</div>
          <div className="grid-cols-1 grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
          </div>
        </Scrollbar>
      </div>
    </div>
  );
}
