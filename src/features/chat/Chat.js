import React from "react";
import useStore from "../../zustand/store";
import ChatList from "./ChatList";
import ChatView from "./ChatView";

export default function Chat() {
     const dataUserFriend = useStore((state) => state.dataUserFriend);
     const dataGroup = useStore((state) => state.dataGroup);
     return (
          <div className="h-screen w-full">
               <div className="h-full w-full flex">
                    <ChatList />
                    {dataUserFriend === undefined ? (
                         dataGroup === undefined ? (
                              <div className="flex h-full w-full items-center justify-center">
                                   <img src={"https://firebasestorage.googleapis.com/v0/b/order-drinks-594fe.appspot.com/o/chat.png?alt=media&token=3b1c2798-a6b4-4d06-8ece-c40fce6b2b64"} alt="" />
                              </div>
                         ) : dataGroup.uid === undefined ? (
                              <div className="flex h-full w-full items-center justify-center">
                                   <img src={"https://firebasestorage.googleapis.com/v0/b/order-drinks-594fe.appspot.com/o/chat.png?alt=media&token=3b1c2798-a6b4-4d06-8ece-c40fce6b2b64"} alt="" />
                              </div>
                         ) : (
                              <ChatView />
                         )
                    ) : dataUserFriend.uid === undefined ? (
                         <div className="flex h-full w-full items-center justify-center">
                              <img src={"https://firebasestorage.googleapis.com/v0/b/order-drinks-594fe.appspot.com/o/chat.png?alt=media&token=3b1c2798-a6b4-4d06-8ece-c40fce6b2b64"} alt="" />
                         </div>
                    ) : (
                         <ChatView />
                    )}
               </div>
          </div>
     );
}
