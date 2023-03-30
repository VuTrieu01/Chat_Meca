import React, { useRef, useState } from "react";
import useStore from "../zustand/store";
import Avatar from "./Avatar";
import { BsChatDots, BsFillChatDotsFill } from "react-icons/bs";
import { RiContactsBook2Line, RiContactsBook2Fill } from "react-icons/ri";
import { FaRegCalendarAlt, FaCalendarAlt } from "react-icons/fa";
import {
  AiOutlineCloud,
  AiTwotoneCloud,
  AiOutlineSetting,
  AiFillSetting,
} from "react-icons/ai";
import Settings from "../features/setting/Settings";
import { useAuth } from "../context/AuthContext";

const sidebarLinks = [
  {
    id: 0,
    icon: <BsChatDots />,
    iconFill: <BsFillChatDotsFill />,
  },
  {
    id: 1,
    icon: <RiContactsBook2Line />,
    iconFill: <RiContactsBook2Fill />,
  },
  {
    id: 2,
    icon: <FaRegCalendarAlt />,
    iconFill: <FaCalendarAlt />,
  },
  {
    id: 3,
    icon: <AiOutlineCloud />,
    iconFill: <AiTwotoneCloud />,
  },
  {
    id: 4,
    icon: <AiOutlineSetting />,
    iconFill: <AiFillSetting />,
  },
];

export default function Sidebar() {
  const [activeSidebar, setActiveSidebar] = useStore((state) => [
    state.activeSidebar,
    state.setActiveSidebar,
  ]);
  const [setting, setSetting] = useState(0);
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const settingRef = useRef();
  const { currentUser } = useAuth();
  const handleChange = () => {
    if (setting !== 4) {
      setSetting(4);
    } else {
      setSetting(0);
    }
    setOpen(!open);
  };
  const handleChangeSetting = () => {
    setSetting(0);
    setOpen(false);
  };
  return (
    <div className="h-screen">
      <div className="h-full w-full flex flex-col items-center pt-4 bg-green-600">
        <Avatar
          title={currentUser.email}
          sx="mx-2 my-10 cursor-pointer"
          size="h-12 w-12"
        />
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col">
            {sidebarLinks.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className={`w-full p-5 text-3xl text-white cursor-pointer ${
                  activeSidebar === item.id
                    ? "bg-green-800 "
                    : "hover:bg-green-700"
                }`}
                onClick={() => setActiveSidebar(item.id)}
              >
                {activeSidebar === item.id ? item.iconFill : item.icon}
              </div>
            ))}
          </div>
          <div className="relative flex flex-col">
            {sidebarLinks.slice(3, 4).map((item) => (
              <div
                key={item.id}
                className={`w-full p-5 text-3xl text-white cursor-pointer ${
                  activeSidebar === item.id
                    ? "bg-green-800 "
                    : "hover:bg-green-700"
                }`}
                onClick={() => setActiveSidebar(item.id)}
              >
                {activeSidebar === item.id ? item.iconFill : item.icon}
              </div>
            ))}
            {sidebarLinks.slice(4).map((item) => (
              <div
                ref={settingRef}
                key={item.id}
                className={`w-full p-5 text-3xl text-white cursor-pointer ${
                  setting === item.id ? "bg-green-800 " : "hover:bg-green-700"
                }`}
                onClick={handleChange}
              >
                {setting === item.id ? item.iconFill : item.icon}
              </div>
            ))}
            {open && <Settings event={menuRef} onClick={handleChangeSetting} />}
          </div>
        </div>
      </div>
    </div>
  );
}
