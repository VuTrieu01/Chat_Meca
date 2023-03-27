import React from "react";
import ContactMenu from "./ContactMenu";
import FriendRequests from "./FriendRequests";
import FriendsList from "./FriendsList";
import useStore from "../../zustand/store";

export default function Contact() {
  const activeContact = useStore((state) => state.activeContact);
  return (
    <div className="h-screen w-full">
      <div className="h-full w-full flex">
        <ContactMenu />
        {activeContact === 0 ? <FriendsList /> : <FriendRequests />}
      </div>
    </div>
  );
}
