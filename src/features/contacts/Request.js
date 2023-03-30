import { child, ref, remove, set, update } from "firebase/database";
import React from "react";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import { database } from "../../firebase";
import { uid } from "uid";

export default function Request(props) {
  const dbRef = ref(database);
  const accounts = props.accounts.filter((val) =>
    props.item.accountId.includes(val.uid)
  );
  const uuid = uid();
  const handleAddFriend = (item) => {
    set(ref(database, `Friends` + `/${uuid}`), {
      uid: uuid,
      accountId: item.accountFriendId,
      accountFriendId: item.accountId,
      status: true,
    })
      .then(() => {
        console.log("Success");
      })
      .catch((error) => {
        console.log(error);
      });
    update(child(dbRef, `Friends` + `/${item.uid}`), {
      status: true,
    });
  };
  const handleRemoveFriend = (item) => {
    remove(child(dbRef, `Friends` + `/${item.uid}`));
  };

  return (
    <>
      {props.item.status === true ? (
        ""
      ) : (
        <div className="w-full bg-white px-5 py-4 rounded-md">
          <div className="flex">
            <Avatar sx="cursor-pointer" />
            <div className="ml-2">
              {accounts.map((item, index) => (
                <p
                  className="w-36 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis"
                  key={index}
                >
                  {item.lastName} {item.firstName}
                </p>
              ))}
              <p className="mb-1">2 bạn chung</p>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <Button
              sx="mr-2 bg-green-500 hover:bg-green-600 xl:w-[50%] xl:text-[72%]"
              onClick={() => handleAddFriend(props.item)}
            >
              Xác nhận
            </Button>
            <Button
              sx="bg-gray-400 hover:bg-gray-500 w-[45%]"
              onClick={() => handleRemoveFriend(props.item)}
            >
              Xóa
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
