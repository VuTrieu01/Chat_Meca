import React, { useState } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import DateInput from "../../components/DateInput";
import { database } from "../../firebase";
import { child, ref, update } from "firebase/database";
import Validation from "../../features/user/Validation";
import { AiOutlineEdit } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { IoAlertCircleSharp, IoCloseSharp } from "react-icons/io5";
import moment from "moment";
import RadioButton from "../../components/RadioButton";
import Avatar from "../../components/Avatar";
import TextFieldArea from "../../components/TextFieldArea";
import UploadAvatar from "./UploadAvatar";

const UserForm = ({ openUser, closeUserForm, data }) => {
     const dbRef = ref(database);
     const [values, setValues] = useState({
          avatar: data.avatar ? data.avatar : "",
          coverPhoto: data.coverPhoto ? data.coverPhoto : "",
          lastName: data.lastName ? data.lastName : "",
          firstName: data.firstName ? data.firstName : "",
          gender: data.gender ? data.gender : "",
          bio: data.bio ? data.bio : "",
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : new Date(),
     });
     const [errors, setErrors] = useState({});
     const [edit, setEdit] = useState(true);
     const [openUploadAvatar, closeUploadAvatar] = useState("hidden");
     const handleChange = (e) => {
          setValues({ ...values, [e.target.name]: e.target.value });
     };
     const handleEdit = () => {
          setEdit(false);
     };
     const handleDateOfBirth = (date, name) => {
          setValues({ ...values, [name]: date });
     };
     const handleClose = () => {
          setValues({ avatar: data ? data.avatar : "", coverPhoto: data ? data.coverPhoto : "", firstName: data ? data.firstName : "", lastName: data ? data.lastName : "", gender: data ? data.gender : "", bio: data ? data.bio : "", dateOfBirth: data ? new Date(data.dateOfBirth) : new Date() });
          setEdit(true);
          setErrors({});
          closeUserForm();
     };
     const handleUpload = () => {
          if (!edit) closeUploadAvatar("");
     };
     const handleSubmit = () => {
          setErrors(Validation(values));
          if (errors.lastName === undefined && errors.firstName === undefined && errors.dateOfBirth === undefined) {
               if (values.lastName !== "" && values.firstName !== "" && values.dateOfBirth !== "") {
                    update(child(dbRef, `Account` + `/${data.uid}`), {
                         avatar: values.avatar,
                         coverPhoto: values.coverPhoto,
                         firstName: values.firstName,
                         lastName: values.lastName,
                         gender: values.gender,
                         bio: values.bio,
                         dateOfBirth: moment(values.dateOfBirth).startOf("day").toDate().toString(),
                    });
                    setEdit(true);
                    setErrors({});
                    closeUserForm();
               }
          }
     };
     return (
          <div>
               <div className={`fixed ${openUser} z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60`}></div>
               <div className={`fixed ${openUser} z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/4 bg-white rounded-md px-8 py-6 drop-shadow-lg`}>
                    <div className="flex justify-end">
                         {edit && (
                              <div title="Chỉnh sửa" className="cursor-pointer hover:bg-gray-200 p-2 rounded-full" onClick={handleEdit}>
                                   <AiOutlineEdit />
                              </div>
                         )}
                         <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-full" onClick={handleClose}>
                              <IoCloseSharp />
                         </div>
                    </div>
                    <div className="text-2xl font-bold mb-2">Trang cá nhân</div>
                    <div className="py-2 border-t border-b border-gray-300 mb-2">
                         <div className="relative flex items-center flex-col mb-5">
                              {!edit ? (
                                   data.coverPhoto ? (
                                        <div>Có hình</div>
                                   ) : (
                                        <div className="w-full h-52 flex items-center justify-center bg-gray-500 cursor-pointer hover:text-white">
                                             <BiImageAdd className="h-8 w-8" />
                                             <div className="font-bold">Thêm ảnh bìa</div>
                                        </div>
                                   )
                              ) : data.coverPhoto ? (
                                   <div>Có hình</div>
                              ) : (
                                   <div className="w-full h-52 bg-gray-500"></div>
                              )}
                              <Avatar url={values.avatar} sx={`absolute bottom-[-2rem] ${!edit && "cursor-pointer"}`} size="h-24 w-24 border border-2 border-white" onClick={handleUpload} />
                              {values.avatar || values.avatar === "" ? <UploadAvatar openUploadAvatar={openUploadAvatar} closeUploadAvatar={closeUploadAvatar} values={values} setValues={setValues} /> : ""}
                         </div>
                         <div className="text-xl font-bold mb-2">Chi tiết</div>
                         {!edit ? <TextFieldArea type="text" placeholder="Tiểu sử bản thân" sx="w-80 md:w-full mb-5" name="bio" value={values.bio} onChange={handleChange} disabled={edit ? true : false} /> : <div className="mb-5">{values.bio}</div>}
                         <div>
                              {errors.lastName && (
                                   <div className="flex items-center text-red-500 text-sm mb-1">
                                        <IoAlertCircleSharp className="text-lg" />
                                        {errors.lastName}
                                   </div>
                              )}
                              <TextField type="text" placeholder="Họ" sx="w-80 md:w-full mb-5" name="lastName" error={errors.lastName ? "border-red-500" : ""} value={values.lastName} onChange={handleChange} disabled={edit ? true : false} />
                         </div>
                         <div>
                              {errors.firstName && (
                                   <div className="flex items-center text-red-500 text-sm mb-1">
                                        <IoAlertCircleSharp className="text-lg" />
                                        {errors.firstName}
                                   </div>
                              )}
                              <TextField type="text" placeholder="Tên" sx="w-80 md:w-full mb-5" name="firstName" error={errors.firstName ? "border-red-500" : ""} value={values.firstName} onChange={handleChange} disabled={edit ? true : false} />
                         </div>
                         <div>
                              {errors.dateOfBirth && (
                                   <div className="flex items-center text-red-500 text-sm mb-1">
                                        <IoAlertCircleSharp className="text-lg" />
                                        {errors.dateOfBirth}
                                   </div>
                              )}
                              <DateInput placeholder="Ngày sinh" sx="w-80 md:w-full mb-3" error={errors.dateOfBirth ? "border-red-500" : ""} selected={values.dateOfBirth} dateFormat="dd/MM/yyyy" onChange={(date) => handleDateOfBirth(date, "dateOfBirth")} disabled={edit ? true : false} />
                         </div>
                         <RadioButton onChange={handleChange} name="gender" checked={values.gender} disabled={edit ? true : false} />
                    </div>
                    <div className="flex justify-end">
                         {!edit && (
                              <Button sx="bg-green-500 hover:bg-green-600" onClick={handleSubmit}>
                                   Cập nhật
                              </Button>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default UserForm;
