import { child, ref, update } from "firebase/database";

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import useStore from "../../zustand/store";
import { useAuth } from "../../context/AuthContext";
import Chat from "../chat/Chat";
import Contact from "../contacts/Contact";
import DatePage from "../date/DatePage";
import { database } from "../../firebase";

export default function Home() {
  const dbRef = ref(database);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { currentUser } = useAuth();
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
    }
  }
  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };
  const lastLoggedInTime = new Date();

  const handleBeforeUnload = () => {
    setIsOnline(false);
    update(child(dbRef, `Account` + `/${currentUser.uid}`), {
      active: false,
      lastLoggedInTime: lastLoggedInTime.getTime(),
    });
  };
  useEffect(() => {
    update(child(dbRef, `Account` + `/${currentUser.uid}`), {
      active: isOnline,
      lastLoggedInTime: lastLoggedInTime.getTime(),
    });
  }, []);
  return (
    <div className="h-screen w-full">
      <div className="h-full w-full flex">
        <Sidebar />
        <SwitchCase />
      </div>
    </div>
  );
}
