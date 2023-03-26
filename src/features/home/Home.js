import React from "react";
import Sidebar from "../../components/Sidebar";
import Chat from "../chat/Chat";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="h-full w-full flex">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
