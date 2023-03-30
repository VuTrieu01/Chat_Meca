import React, { useEffect, useState } from "react";
import { FiUserPlus, FiUserX } from "react-icons/fi";
import SearchInput from "../../components/SearchInput";
import Scrollbar from "../../components/Scrollbar";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import { uid } from "uid";
import { ref, set } from "firebase/database";
import { database } from "../../firebase";

export default function AddFriend(props) {
  const currentUser = props.currentUser;
  const uuid = uid();
  const friend = props.friends
    .filter((val) => val.accountId === currentUser.uid)
    .map((item) => item.accountFriendId);
  const friend2 = props.friends
    .filter((val) => val.accountFriendId === currentUser.uid)
    .map((item) => item.accountId);
  const accounts = props.accounts.filter(
    (val) =>
      val.uid !== currentUser.uid &&
      !friend.includes(val.uid) &&
      !friend2.includes(val.uid)
  );
  const handleAddFriend = (item) => {
    try {
      set(ref(database, `Friends` + `/${uuid}`), {
        uid: uuid,
        accountId: currentUser.uid,
        accountFriendId: item.uid,
        status: false,
      })
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };
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

          {accounts.length === 0 ? (
            <div className="w-full h-4/5 flex flex-col items-center justify-center">
              <FiUserX className="text-5xl" />
              <div className="text-2xl">Gợi ý Trống</div>
            </div>
          ) : (
            <div className="grid-cols-1 grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {accounts.map((item, index) => (
                <div
                  className="w-full bg-white px-5 py-4 rounded-md"
                  key={index}
                >
                  <div className="flex">
                    <Avatar sx="cursor-pointer" />
                    <div className="ml-2">
                      <p className="w-36 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {item.lastName} {item.firstName}
                      </p>
                      <p className="mb-1">2 bạn chung</p>
                    </div>
                  </div>
                  <div className="flex justify-end w-full">
                    <Button
                      sx="mr-2 bg-green-500 hover:bg-green-600"
                      onClick={() => handleAddFriend(item)}
                    >
                      Kết bạn
                    </Button>
                    {/* <Button sx="bg-gray-400 hover:bg-gray-500 w-[50%]">
                    Bỏ qua
                  </Button> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Scrollbar>
      </div>
    </div>
  );
}
