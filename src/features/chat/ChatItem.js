import React from "react";
import Avatar from "../../components/Avatar";
import Ping from "../../components/Ping";
import useStore from "../../zustand/store";
import { ConvertNumberToTime } from "../../components/ConvertNumberToTime";

export default function ChatItem(props) {
  const addProvisionalDataAccount = useStore(
    (state) => state.addProvisionalDataAccount
  );
  const setOpenChat = useStore((state) => state.setOpenChat);
  const openChat = useStore((state) => state.openChat);
  let chat = [];
  let chatFriend = [];
  let account = [];
  let accountFriend = [];
  if (props.chat !== undefined) {
    chat = props.chat.sort((a, b) => b.lastLoggedInTime - a.lastLoggedInTime);
  }
  if (props.chatFriend !== undefined) {
    chatFriend = props.chatFriend.sort(
      (a, b) => b.lastLoggedInTime - a.lastLoggedInTime
    );
  }
  if (props.accounts !== undefined) {
    account = props.accounts.filter((val) =>
      chat.map((item) => item.accountFriendId).includes(val.uid)
    );
    accountFriend = props.accounts.filter((val) =>
      chatFriend.map((item) => item.accountId).includes(val.uid)
    );
  }
  const lastItemChat = [chat[0]];
  const lastItemChatFriend = [chatFriend[0]];
  const handleClick = (item) => {
    setOpenChat(true);
    addProvisionalDataAccount([item]);
  };
  return (
    <>
      {account.map((item, index) => (
        <div
          key={index}
          className={`w-full px-5 py-4 cursor-pointer ${
            props.click ? "bg-green-100" : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => handleClick(item)}
        >
          <div className="flex items-center">
            <div className="flex items-end">
              <Avatar url={props.url} />
              {item.active ? (
                <Ping sx="right-3" />
              ) : (
                <div className="h-3 w-3"></div>
              )}
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="mr-4">
                <div className="w-48 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {item.lastName} {item.firstName}
                </div>
                {lastItemChat.map((item, index) =>
                  item.newText ? (
                    <>
                      <div
                        key={index}
                        className="w-36 font-bold text-green-600 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis"
                      >
                        {item.textFriend}
                      </div>
                      <div className="w-48 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {item.text}
                      </div>
                    </>
                  ) : (
                    <div className="w-48 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {item.text}
                      {item.textFriend}
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-col items-end">
                {lastItemChat.map((item, index) => (
                  <div className="text-gray-400 text-sm" key={index}>
                    {ConvertNumberToTime(item.lastLoggedInTime)}
                  </div>
                ))}
                {props.newChat ? (
                  <div className="flex items-center justify-center h-5 w-5 p-2 bg-red-600 text-white font-bold rounded-full text-xs">
                    1
                  </div>
                ) : (
                  <div className="h-5 w-5 p-2" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {accountFriend.map((item, index) => (
        <div
          key={index}
          className={`w-full px-5 py-4 cursor-pointer ${
            props.click ? "bg-green-100" : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => handleClick(item)}
        >
          <div className="flex items-center">
            <div className="flex items-end">
              <Avatar url={props.url} />
              {item.active ? (
                <Ping sx="right-3" />
              ) : (
                <div className="h-3 w-3"></div>
              )}
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="mr-4">
                <div className="w-48 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {item.lastName} {item.firstName}
                </div>
                {lastItemChatFriend.map((item, index) =>
                  item.newText ? (
                    <>
                      <div
                        key={index}
                        className="w-36 font-bold text-green-600 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis"
                      >
                        {item.text}
                      </div>
                      <div className="w-48 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {item.textFriend}
                      </div>
                    </>
                  ) : (
                    <div className="w-48 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {item.text}
                      {item.textFriend}
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-col items-end">
                {lastItemChatFriend.map((item, index) => (
                  <div className="text-gray-400 text-sm" key={index}>
                    {ConvertNumberToTime(item.lastLoggedInTime)}
                  </div>
                ))}
                {props.newChat ? (
                  <div className="flex items-center justify-center h-5 w-5 p-2 bg-red-600 text-white font-bold rounded-full text-xs">
                    1
                  </div>
                ) : (
                  <div className="h-5 w-5 p-2" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
