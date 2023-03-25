import React from "react";
import Sidebar from "../../components/Sidebar";
import Chat from "../chat/Chat";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="h-full flex">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
