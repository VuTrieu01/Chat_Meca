import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import TextField from "../../components/TextField";
import SearchInput from "../../components/SearchInput";
import Scrollbar from "../../components/Scrollbar";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
const GroupForm = ({ openGroupForm, closeGroupForm, values, setValues, width, height }) => {
     const closeUpload = () => {
          closeGroupForm("hidden");
     };
     return (
          <div>
               <div className={`fixed ${openGroupForm} z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60`}></div>
               <div className={`fixed ${openGroupForm} z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 bg-white rounded-md py-4 drop-shadow-lg`}>
                    <div className="flex justify-between pb-4 mb-4 px-8 border-gray-100 border-b-2">
                         <div className="text-lg font-bold">Tạo nhóm</div>
                         <div className="cursor-pointer hover:bg-gray-200 p-1 rounded-full" onClick={closeUpload}>
                              <IoCloseSharp />
                         </div>
                    </div>
                    <div className="px-8">
                         <TextField type="text" placeholder="Tên nhóm (Bắt buộc)" sx="w-80 md:w-full mb-4" name="lastName" />
                         <div className="text-sm mb-2">Thêm thành viên</div>
                         <SearchInput sx="mb-4"/>
                         <Scrollbar height="h-96">
                              <>
                              <div className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-100">
                                   <Avatar size="h-10 w-10" />
                                   <div className="ml-2">
                                        <p className="w-36 text-sm font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">Anh Lê</p>
                                   </div>
                              </div>
                              <div className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-100">
                                   <Avatar size="h-10 w-10" />
                                   <div className="ml-2">
                                        <p className="w-36 text-sm font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">Anh Lê</p>
                                   </div>
                              </div>
                              <div className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-100">
                                   <Avatar size="h-10 w-10" />
                                   <div className="ml-2">
                                        <p className="w-36 text-sm font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">Anh Lê</p>
                                   </div>
                              </div>
                              <div className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-100">
                                   <Avatar size="h-10 w-10" />
                                   <div className="ml-2">
                                        <p className="w-36 text-sm font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">Anh Lê</p>
                                   </div>
                              </div>
                              <div className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-100">
                                   <Avatar size="h-10 w-10" />
                                   <div className="ml-2">
                                        <p className="w-36 text-sm font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">Anh Lê</p>
                                   </div>
                              </div>
                              <div className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-100">
                                   <Avatar size="h-10 w-10" />
                                   <div className="ml-2">
                                        <p className="w-36 text-sm font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">Anh Lê</p>
                                   </div>
                              </div>
                              <div className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-100">
                                   <Avatar size="h-10 w-10" />
                                   <div className="ml-2">
                                        <p className="w-36 text-sm font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">Anh Lê</p>
                                   </div>
                              </div>
                              <div className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-100">
                                   <Avatar size="h-10 w-10" />
                                   <div className="ml-2">
                                        <p className="w-36 text-sm font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">Anh Lê</p>
                                   </div>
                              </div>
                              </>
                         </Scrollbar>
                    </div>
                    <div className="flex justify-end pt-4 px-8 border-gray-100 border-t-2">
                         <Button sx="bg-green-500 hover:bg-green-600">Tạo nhóm</Button>
                    </div>
               </div>
          </div>
     );
};

export default GroupForm;
