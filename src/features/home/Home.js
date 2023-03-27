import React from "react";
import Sidebar from "../../components/Sidebar";
import useStore from "../../zustand/store";
import Chat from "../chat/Chat";
import Contact from "../contacts/Contact";
import DatePage from "../date/DatePage";

export default function Home() {
  const activeSidebar = useStore((state) => state.activeSidebar);

  function SwitchCase() {
    switch (activeSidebar) {
      case 0:
        return <Chat />;
      case 1:
        return <Contact />;
      case 2:
        return <DatePage />;
      case 3:
        return <DatePage />;
      case 4:
        return <DatePage />;
    }
  }
  return (
    <div className="h-screen w-full">
      <div className="h-full w-full flex">
        <Sidebar />
        <SwitchCase />
      </div>
    </div>
  );
}
