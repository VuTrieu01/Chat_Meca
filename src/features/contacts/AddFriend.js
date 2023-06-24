import React, { useState } from "react";
import { FiUserPlus, FiUserX } from "react-icons/fi";
import SearchInput from "../../components/SearchInput";
import Scrollbar from "../../components/Scrollbar";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import { uid } from "uid";
import { ref, set } from "firebase/database";
import { database } from "../../firebase";
import { AiOutlineSearch } from "react-icons/ai";
import UserForm from "../user/UserForm";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import FriendSuggestions from "./FriendSuggestions";
import moment from "moment";

const provinceMap = {
     "An Giang": "AG",
     "Bà Rịa - Vũng Tàu": "VT",
     "Bắc Giang": "BG",
     "Bắc Kạn": "BK",
     "Bạc Liêu": "BL",
     "Bắc Ninh": "BN",
     "Bến Tre": "BT",
     "Bình Định": "BD",
     "Bình Dương": "BD",
     "Bình Phước": "BP",
     "Bình Thuận": "BTH",
     "Cà Mau": "CM",
     "Cần Thơ": "CT",
     "Cao Bằng": "CB",
     "Đà Nẵng": "DN",
     "Đắk Lắk": "ĐL",
     "Đắk Nông": "ĐN",
     "Điện Biên": "ĐB",
     "Đồng Nai": "ĐN",
     "Đồng Tháp": "ĐT",
     "Gia Lai": "GL",
     "Hà Giang": "HG",
     "Hà Nam": "HN",
     "Hà Nội": "HN",
     "Hà Tĩnh": "HT",
     "Hải Dương": "HĐ",
     "Hải Phòng": "HP",
     "Hậu Giang": "HG",
     "Hòa Bình": "HB",
     "Hưng Yên": "HY",
     "Khánh Hòa": "KH",
     "Kiên Giang": "KG",
     "Kon Tum": "KT",
     "Lai Châu": "LC",
     "Lâm Đồng": "LD",
     "Lạng Sơn": "LS",
     "Lào Cai": "LC",
     "Long An": "LA",
     "Nam Định": "ND",
     "Nghệ An": "NA",
     "Ninh Bình": "NB",
     "Ninh Thuận": "NT",
     "Phú Thọ": "PT",
     "Phú Yên": "PY",
     "Quảng Bình": "QB",
     "Quảng Nam": "QN",
     "Quảng Ngãi": "QNg",
     "Quảng Ninh": "QNi",
     "Quảng Trị": "QT",
     "Sóc Trăng": "ST",
     "Sơn La": "SL",
     "Tây Ninh": "TN",
     "Thái Bình": "TB",
     "Thái Nguyên": "TN",
     "Thanh Hóa": "TH",
     "Thừa Thiên Huế": "TTH",
     "Tiền Giang": "TG",
     "TP. Hồ Chí Minh": "HCM",
     "Trà Vinh": "TV",
     "Tuyên Quang": "TQ",
     "Vĩnh Long": "VL",
     "Vĩnh Phúc": "VP",
     "Yên Bái": "YB",
};
export default function AddFriend({ currentUser, accounts, friends, getCommonFriendsCount, getDataFriends }) {
     const uuid = uid();
     const [search, setSearch] = useState("");
     const [openUser, setOpenUser] = useState("hidden");
     const [openFriendSuggestions, setOpenFriendSuggestions] = useState("hidden");
     const [openSendFriends, setSendFriends] = useState("hidden");
     const [id, setId] = useState(-1);
     const openUserForm = (id) => {
          setId(id);
          setOpenUser("");
     };
     const closeUserForm = () => {
          setOpenUser("hidden");
     };
     const openFriendSuggestionsForm = (id) => {
          setId(id);
          setOpenFriendSuggestions("");
     };
     const closeFriendSuggestions = () => {
          setOpenFriendSuggestions("hidden");
     };
     const friendsArray = Object.values(friends)
          .flatMap((obj) => Object.values(obj))
          .filter((val) => val.accountId === currentUser.uid || val.accountFriendId === currentUser.uid);
     const user = accounts.filter((val) => val.uid !== currentUser.uid && !friendsArray.map((item) => item.accountFriendId).includes(val.uid) && !friendsArray.map((item) => item.accountId).includes(val.uid));
     const friendSuggestions = accounts.filter((val) => val.uid !== currentUser.uid && !friendsArray.map((item) => item.accountFriendId).includes(val.uid) && !friendsArray.map((item) => item.accountId).includes(val.uid) && getCommonFriendsCount(val.uid) > 0);
     const friendSuggestionsByDetail = accounts.filter((val) => val.uid !== currentUser.uid && !friendsArray.map((item) => item.accountFriendId).includes(val.uid) && !friendsArray.map((item) => item.accountId).includes(val.uid));
     const searchData = search !== "" && user.filter((val) => (val.lastName + " " + val.firstName).toLowerCase().includes(search.toLowerCase()));
     const handleChange = (e) => {
          if (e.target) setSearch(e.target.value);
     };
     // Tính toán độ tương đồng giữa hai người dùng
     const calculateSimilarity = (user1, user2) => {
          let count = 0;
          if (provinceMap[user1.address] === provinceMap[user2.address]) {
               count++;
          }
          if ((user1.gender === "Nam" && user2.gender === "Nữ") || (user1.gender === "Nữ" && user2.gender === "Nam")) {
               count++;
          }
          if (moment(user1.dateOfBirth).format("YYYY") === moment(user2.dateOfBirth).format("YYYY")) {
               count++;
          }
          return count;
     };

     // Đề xuất những người dùng có địa chỉ tương đồng nhất với người dùng được chỉ định
     const recommendFriends = (userId, data) => {
          const user = accounts.find((user) => user.uid === userId);
          const similarities = data
               .filter((it) => it.uid !== userId)
               .map((item) => ({
                    uid: item.uid,
                    similarity: calculateSimilarity(user, item),
               }))
               .sort((a, b) => b.similarity - a.similarity);
          return similarities;
     };

     const recommendedFriends = recommendFriends(currentUser.uid, friendSuggestionsByDetail);
     const friendSuggestionsAll = accounts
          .filter(
               (val) =>
                    recommendedFriends
                         .filter((it) => it.similarity > 0)
                         .map((it) => it.uid)
                         .includes(val.uid) && !friendSuggestions.map((item) => item.uid).includes(val.uid)
          )
          .map((ite) => {
               const sortFriends = recommendedFriends.filter((it) => it.similarity > 0 && it.uid === ite.uid)[0];
               return {
                    ...ite,
                    sortFriends: sortFriends ? sortFriends.similarity : 0,
               };
          });
     const handleAddFriend = (item) => {
          try {
               set(ref(database, `Friends/${currentUser.uid}/${uuid}`), {
                    uid: uuid,
                    accountId: currentUser.uid,
                    accountFriendId: item.uid,
                    status: false,
               })
                    .then(() => {
                         console.log("Success");
                    })
                    .catch((error) => {
                         console.log(error);
                    });
          } catch (e) {
               console.log(e);
          }
     };
     return (
          <div className="h-full w-full">
               <div className="h-full w-full bg-gray-100">
                    <div className="flex items-center justify-between bg-white p-6 border-gray-100 border-b-2">
                         <div className="flex items-center">
                              <FiUserPlus className="text-2xl" />
                              <div className="ml-4 font-bold">Thêm bạn bè</div>
                         </div>
                    </div>
                    <div className="w-full py-[0.43rem] px-6 bg-white border-gray-100 border-b-2">
                         <SearchInput sx="w-2/5" placeholder="Tìm kiếm bạn bè" value={search} onChange={handleChange} />
                    </div>
                    <Scrollbar sx="px-5">
                         {!searchData ? (
                              <>
                                   <div className="h-40 flex flex-col items-center justify-center">
                                        <AiOutlineSearch className="text-5xl" />
                                        <div>Tìm kiếm bạn bè</div>
                                   </div>
                                   <div className="flex items-center w-full pb-4 border-gray-100 border-b-2">
                                        <div className="font-bold mr-1">Gợi ý kết bạn({friendSuggestions.length + friendSuggestionsAll.length})</div>
                                        {friendSuggestions.length + friendSuggestionsAll.length > 0 && (
                                             <>
                                                  {friendSuggestions.length + friendSuggestionsAll.length < 8 ? (
                                                       openSendFriends === "hidden" ? (
                                                            <div onClick={() => setSendFriends("")} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                                 <IoMdArrowDropdown />
                                                            </div>
                                                       ) : (
                                                            <div onClick={() => setSendFriends("hidden")} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                                 <IoMdArrowDropup />
                                                            </div>
                                                       )
                                                  ) : openSendFriends === "" ? (
                                                       <div onClick={() => setSendFriends("hidden")} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                            <IoMdArrowDropup />
                                                       </div>
                                                  ) : (
                                                       <div onClick={() => setSendFriends("")} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
                                                            <IoMdArrowDropdown />
                                                       </div>
                                                  )}
                                             </>
                                        )}
                                   </div>
                                   <div className={`${friendSuggestions.length + friendSuggestionsAll.length > 8 ? (openSendFriends === "hidden" ? "hidden" : "") : openSendFriends === "" ? "" : "hidden"} grid-cols-1 grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4`}>
                                        {friendSuggestions.map((item, index) => {
                                             const count = getCommonFriendsCount(item.uid);
                                             return (
                                                  <div className="w-full bg-white px-5 py-4 rounded-md" key={index}>
                                                       <div className="flex">
                                                            <Avatar url={item.avatar} size="h-12 w-12" sx="cursor-pointer" onClick={() => openUserForm(index)} />
                                                            {id === index && (
                                                                 <>
                                                                      <UserForm openUser={openUser} closeUserForm={closeUserForm} data={item} />
                                                                      <FriendSuggestions openFriendSuggestions={openFriendSuggestions} closeFriendSuggestions={closeFriendSuggestions} data={item} getDataFriends={getDataFriends} accounts={accounts} />
                                                                 </>
                                                            )}
                                                            <div className="ml-2">
                                                                 <p className="w-36 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                                                      {item.lastName} {item.firstName}
                                                                 </p>
                                                                 <p className="mb-1 text-sm cursor-pointer hover:text-blue-500 hover:underline" onClick={() => openFriendSuggestionsForm(index)}>
                                                                      {count} bạn chung
                                                                 </p>
                                                            </div>
                                                       </div>
                                                       <div className="flex justify-end w-full">
                                                            <Button sx="mr-2 bg-green-500 hover:bg-green-600" onClick={() => handleAddFriend(item)}>
                                                                 Kết bạn
                                                            </Button>
                                                       </div>
                                                  </div>
                                             );
                                        })}
                                        {friendSuggestionsAll.map((item, index) => (
                                             <div className="w-full bg-white px-5 py-4 rounded-md" key={index}>
                                                  <div className="flex">
                                                       <Avatar url={item.avatar} size="h-12 w-12" sx="cursor-pointer" onClick={() => openUserForm(item.uid)} />
                                                       {id === item.uid && <UserForm openUser={openUser} closeUserForm={closeUserForm} data={item} />}
                                                       <div className="ml-2">
                                                            <p className="w-36 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                                                 {item.lastName} {item.firstName}
                                                            </p>
                                                            <p className="mb-1 text-sm text-gray-500">Có thể bạn quen</p>
                                                       </div>
                                                  </div>
                                                  <div className="flex justify-end w-full">
                                                       <Button sx="mr-2 bg-green-500 hover:bg-green-600" onClick={() => handleAddFriend(item)}>
                                                            Kết bạn
                                                       </Button>
                                                  </div>
                                             </div>
                                        ))}
                                   </div>
                              </>
                         ) : searchData.length === 0 ? (
                              <div className="h-40 flex flex-col items-center justify-center py-44">
                                   <FiUserX className="text-5xl" />
                                   <div>Không tìm thấy người dùng này</div>
                              </div>
                         ) : (
                              <div className="grid-cols-1 grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
                                   {searchData.map((item, index) => {
                                        const count = getCommonFriendsCount(item.uid);
                                        return (
                                             <div className="w-full bg-white px-5 py-4 rounded-md" key={index}>
                                                  <div className="flex">
                                                       <Avatar url={item.avatar} size="h-12 w-12" sx="cursor-pointer" onClick={() => openUserForm(index)} />
                                                       {id === index && <UserForm openUser={openUser} closeUserForm={closeUserForm} data={item} />}
                                                       <div className="flex flex-col justify-center ml-2">
                                                            <p className="w-36 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                                                 {item.lastName} {item.firstName}
                                                            </p>
                                                            {count > 0 && <p className="mb-1">{count} bạn chung</p>}
                                                       </div>
                                                  </div>
                                                  <div className="flex justify-end w-full">
                                                       <Button sx="mr-2 bg-green-500 hover:bg-green-600" onClick={() => handleAddFriend(item)}>
                                                            Kết bạn
                                                       </Button>
                                                  </div>
                                             </div>
                                        );
                                   })}
                              </div>
                         )}
                    </Scrollbar>
               </div>
          </div>
     );
}
