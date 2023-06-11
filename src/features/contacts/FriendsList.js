import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import SearchInput from "../../components/SearchInput";
import Scrollbar from "../../components/Scrollbar";
import Friend from "./Friend";
import { useState } from "react";

export default function FriendsList({ currentUser, accounts, friends }) {
     const [search, setSearch] = useState("");
     const friendsArray = Object.values(friends)
          .flatMap((obj) => Object.values(obj))
          .filter((val) => val.accountFriendId === currentUser.uid);
     const userArray = Object.values(friends)
          .flatMap((obj) => Object.values(obj))
          .filter((val) => val.accountId === currentUser.uid || val.accountFriendId === currentUser.uid);
          const searchData = search !== "" && friendsArray.filter(val => val.accountId.includes(accounts.filter((val) => (val.lastName + " " + val.firstName).toLowerCase().includes(search.toLowerCase())).map(item => item.uid)));
     const handleChange = (e) => {
          if (e.target) setSearch(e.target.value);
     };
     return (
          <div className="h-full w-full">
               <div className="h-[75%] md:h-full md:w-full bg-white">
                    <div className="flex items-center justify-between bg-white p-6 border-gray-100 border-b-2">
                         <div className="flex items-center">
                              <HiOutlineUserGroup className="text-2xl" />
                              <div className="ml-4 font-bold">Danh sách bạn bè</div>
                         </div>
                    </div>
                    <div className="flex items-center justify-between w-full py-[0.43rem] px-6 border-gray-100 border-b-2">
                         <div className="font-bold">Bạn bè ({friendsArray.filter((item) => item.status === true).length})</div>
                         <SearchInput sx="w-2/5" value={search} onChange={handleChange} />
                    </div>
                    <Scrollbar>
                      {searchData ? 
                        searchData.map((item, index) => <Friend key={index} accounts={accounts} friends={item} currentUser={currentUser} userArray={userArray} />) 
                        : friendsArray.map((item, index) => <Friend key={index} accounts={accounts} friends={item} currentUser={currentUser} userArray={userArray} />)}
                      </Scrollbar>
               </div>
          </div>
     );
}
