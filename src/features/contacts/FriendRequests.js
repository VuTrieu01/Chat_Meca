import React from "react";
import { FiMail, FiUserX } from "react-icons/fi";
import Scrollbar from "../../components/Scrollbar";
import Request from "./Request";

export default function FriendRequests(props) {
  const currentUser = props.currentUser;
  const friend = props.friends.filter(
    (val) => val.accountFriendId === currentUser.uid
  );
  return (
    <div className="h-full w-full">
      <div className="h-full w-full bg-gray-100">
        <div className="flex items-center justify-between bg-white p-6 border-gray-100 border-b-2">
          <div className="flex items-center">
            <FiMail className="text-2xl" />
            <div className="ml-4 font-bold">Lời mời kết bạn</div>
          </div>
        </div>
        {/* <div className="w-full h-4/5 my-10 flex flex-col items-center justify-center">
          <FiUserX className="text-5xl" />
          <div>Không có lời mời nào</div>
        </div> */}
        <div className="flex items-center justify-between w-full py-4 px-6 border-gray-100 border-b-2">
          <div className="font-bold">
            {friend.filter((item) => item.status === false).length} lời mời kết
            bạn
          </div>
        </div>
        <Scrollbar sx="px-5 grid-cols-1 grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {friend.map((item, index) => (
            <Request item={item} key={index} accounts={props.accounts} />
          ))}
        </Scrollbar>
      </div>
    </div>
  );
}
