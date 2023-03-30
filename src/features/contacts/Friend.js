import React from "react";
import Avatar from "../../components/Avatar";
import Ping from "../../components/Ping";
import useStore from "../../zustand/store";
export default function Friend(props) {
  const setOpenChat = useStore((state) => state.setOpenChat);
  const addProvisionalDataAccount = useStore(
    (state) => state.addProvisionalDataAccount
  );
  const accounts = props.accounts.filter((val) =>
    props.item.accountId.includes(val.uid)
  );
  const handleClick = () => {
    setOpenChat(true);
    addProvisionalDataAccount(accounts);
  };
  return (
    <>
      {props.item.status === true
        ? accounts.map((item, index) => (
            <div
              onClick={handleClick}
              className="flex items-center w-full bg-white px-5 py-4 cursor-pointer hover:bg-gray-100"
              key={index}
            >
              {item.active ? (
                <div className="flex items-end">
                  <Avatar />
                  <Ping sx="right-3" />
                </div>
              ) : (
                <Avatar sx="mr-2" />
              )}

              <div>
                <p className="font-bold">
                  {item.lastName} {item.firstName}
                </p>
                <p>2 bạn chung</p>
              </div>
            </div>
          ))
        : ""}
    </>
  );
}
