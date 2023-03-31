import React, { useState } from "react";
import {
  AiOutlineBell,
  AiOutlineFileText,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsImages } from "react-icons/bs";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { RiFontSize } from "react-icons/ri";
import Avatar from "../../components/Avatar";
import OfflineTimeCounter from "../../components/OfflineTimeCounter";
import Ping from "../../components/Ping";

export default function ConversationInfo(props) {
  const [openChangeChat, setOpenChangeChat] = useState(false);
  const [openChangeFile, setOpenChangeFile] = useState(false);
  const provisionalDataAccount = props.provisionalDataAccount;
  const handleOpenChangeChat = () => {
    setOpenChangeChat(!openChangeChat);
  };
  const handleOpenChangeFile = () => {
    setOpenChangeFile(~openChangeFile);
  };
  return (
    <div className="h-screen w-2/5 bg-white">
      {provisionalDataAccount.map((item, index) => (
        <div className="h-full p-3 border-gray-100 border-l-2" key={index}>
          <div className="h-full w-full flex flex-col items-center">
            {item.active ? (
              <>
                <div className="mb-[-4px] mt-2">
                  <Avatar size="h-20 w-20" />
                  <Ping sx="left-[3.8rem] bottom-4" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-xl">
                    {item.lastName} {item.firstName}
                  </p>
                  <p>Đang hoạt động</p>
                </div>
              </>
            ) : (
              <>
                <div className="mb-[-4px] mt-2">
                  <Avatar size="h-20 w-20" />
                </div>
                <div className="text-center mt-2">
                  <p className="font-bold text-xl">
                    {item.lastName} {item.firstName}
                  </p>
                  <div className="flex justify-center">
                    <OfflineTimeCounter
                      lastLoggedInTime={item.lastLoggedInTime}
                    />
                    <div className="ml-1">trước</div>
                  </div>
                </div>
              </>
            )}
            <div className="flex mt-5">
              <div className="w-24 flex flex-col items-center">
                <BiUserCircle className="rounded-full bg-gray-100 p-1 text-4xl cursor-pointer hover:bg-gray-200" />
                <p className="text-center font-medium text-sm text-gray-500">
                  Trang cá nhân
                </p>
              </div>
              <div className="w-24 flex flex-col items-center">
                <AiOutlineSearch className="rounded-full bg-gray-100 p-1 text-4xl cursor-pointer hover:bg-gray-200" />
                <p className="text-center font-medium text-sm text-gray-500">
                  Tìm kiếm
                </p>
              </div>
            </div>
            <div className="w-full font-bold mt-6">
              <div
                className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer"
                onClick={handleOpenChangeChat}
              >
                <div>Tùy chỉnh đoạn chat</div>
                {openChangeChat ? <MdArrowDropUp /> : <MdArrowDropDown />}
              </div>
              {openChangeChat ? (
                <>
                  <div className="w-full flex items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer">
                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                    <div className="ml-2">Đổi chủ đề</div>
                  </div>
                  <div className="w-full flex items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer">
                    <RiFontSize className="text-lg" />
                    <div className="ml-2">Chỉnh sửa biệt danh</div>
                  </div>
                </>
              ) : (
                ""
              )}
              <div
                className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer"
                onClick={handleOpenChangeFile}
              >
                <div>File phương tiện, file</div>
                {openChangeFile ? <MdArrowDropUp /> : <MdArrowDropDown />}
              </div>
              {openChangeFile ? (
                <>
                  <div className="w-full flex items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer">
                    <BsImages className="text-lg" />
                    <div className="ml-2">File phương tiện</div>
                  </div>
                  <div className="w-full flex items-center py-3 px-4 rounded-xl hover:bg-gray-100 cursor-pointer">
                    <AiOutlineFileText className="text-xl" />
                    <div className="ml-2">File</div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
