import React, { useState } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import DateInput from "../../components/DateInput";
import { database } from "../../firebase";
import { child, ref, update } from "firebase/database";
import Validation from "../../features/user/Validation";
import { AiFillHome, AiOutlineEdit } from "react-icons/ai";
import { IoAlertCircleSharp, IoCloseSharp } from "react-icons/io5";
import { FaBirthdayCake } from "react-icons/fa";
import { SlUserFemale, SlUser } from "react-icons/sl";
import moment from "moment";
import RadioButton from "../../components/RadioButton";
import Avatar from "../../components/Avatar";
import TextFieldArea from "../../components/TextFieldArea";
import UploadAvatar from "./UploadAvatar";
import Scrollbar from "../../components/Scrollbar";
import DropdownAddress from "../../components/DropdownAddress";

const UserForm = ({ openUser, closeUserForm, data, editUser }) => {
     const dbRef = ref(database);
     const [values, setValues] = useState({
          avatar: data.avatar ? data.avatar : "",
          coverPhoto: data.coverPhoto ? data.coverPhoto : "",
          lastName: data.lastName ? data.lastName : "",
          firstName: data.firstName ? data.firstName : "",
          gender: data.gender ? data.gender : "",
          bio: data.bio ? data.bio : "",
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : new Date(),
          address: data.address ? data.address : "",
     });
     const [errors, setErrors] = useState({});
     const [edit, setEdit] = useState(true);
     const [openUploadAvatar, closeUploadAvatar] = useState("hidden");
     const [idd, setIdd] = useState(0);
     const handleChange = (e) => {
          setValues({ ...values, [e.target.name]: e.target.value });
     };
     const handleEdit = () => {
          setEdit(false);
     };
     const handleDateOfBirth = (date, name) => {
          setValues({ ...values, [name]: date });
     };
     const handleAddress = (address, name) => {
          setValues({ ...values, [name]: address });
     };
     const handleClose = () => {
          setValues({ avatar: data ? data.avatar : "", coverPhoto: data ? data.coverPhoto : "", firstName: data ? data.firstName : "", lastName: data ? data.lastName : "", gender: data ? data.gender : "", bio: data ? data.bio : "", dateOfBirth: data ? new Date(data.dateOfBirth) : new Date(), address: data ? data.address : "" });
          setEdit(true);
          setErrors({});
          closeUserForm();
     };
     const handleUpload = (id) => {
          if (!edit) {
               closeUploadAvatar("");
               setIdd(id);
          }
     };
     const handleSubmit = () => {
          setErrors(Validation(values));
          if (errors.lastName === undefined && errors.firstName === undefined && errors.dateOfBirth === undefined) {
               if (values.lastName !== "" && values.firstName !== "" && values.dateOfBirth !== "") {
                    update(child(dbRef, `Account/${data.uid}`), {
                         avatar: values.avatar,
                         coverPhoto: values.coverPhoto,
                         firstName: values.firstName,
                         lastName: values.lastName,
                         gender: values.gender,
                         bio: values.bio,
                         dateOfBirth: moment(values.dateOfBirth).startOf("day").toDate().toString(),
                         address: values.address,
                    });
                    setEdit(true);
                    setErrors({});
               }
          }
     };
     return (
          <div>
               <div className={`fixed ${openUser} z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60`}></div>
               <div className={`fixed ${openUser} z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 bg-white rounded-md px-8 py-6 drop-shadow-lg`}>
                    <div className="flex justify-end">
                         {edit && editUser && (
                              <div title="Chỉnh sửa" className="cursor-pointer hover:bg-gray-200 p-2 rounded-full" onClick={handleEdit}>
                                   <AiOutlineEdit />
                              </div>
                         )}
                         <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-full" onClick={handleClose}>
                              <IoCloseSharp />
                         </div>
                    </div>
                    <div className="text-lg font-bold mb-2">Trang cá nhân</div>
                    <Scrollbar height="h-[30rem]" sx="mr-1">
                         <>
                              <div className="py-2 border-t border-b border-gray-300 mb-2">
                                   <div className="relative flex items-center flex-col mb-8">
                                        <div className={`w-full flex items-center justify-center bg-gray-500 ${!edit && "cursor-pointer hover:text-white"}`} onClick={() => handleUpload(0)}>
                                             {values.coverPhoto ? <img className="w-full h-[192px]" src={values.coverPhoto} alt="" /> : <div className="w-full h-[192px]"></div>}
                                        </div>
                                        {idd === 0 && <UploadAvatar openUploadAvatar={openUploadAvatar} closeUploadAvatar={closeUploadAvatar} coverPhoto values={values} setValues={setValues} width={550} height={212} />}
                                        <Avatar url={values.avatar} sx={`absolute bottom-[-2rem] ${!edit && "cursor-pointer"}`} size="h-24 w-24 border border-2 border-white" onClick={() => handleUpload(1)} />
                                        {idd === 1 && <UploadAvatar openUploadAvatar={openUploadAvatar} closeUploadAvatar={closeUploadAvatar} values={values} setValues={setValues} />}
                                   </div>
                                   {edit ? (
                                        <>
                                             <div className="w-full flex items-center justify-center font-bold">
                                                  {values.lastName} {values.firstName}
                                             </div>
                                             <div className="text-base font-bold mb-1">Giới thiệu</div>
                                             <div className="flex justify-center mb-1">
                                                  <pre className="font-sans text-sm">{values.bio}</pre>
                                             </div>
                                             <div className="flex items-start mb-1">
                                                  <FaBirthdayCake className="mr-2 mt-1 text-green-600 " />
                                                  <div>
                                                       <div>{moment(values.dateOfBirth).format("DD/MM/YYYY")}</div>
                                                       <div className="text-sm text-gray-700">Ngày sinh</div>
                                                  </div>
                                             </div>
                                             <div className="flex items-start mb-1">
                                                  {values.gender === "Nam" ? <SlUser className="mr-2 mt-1 text-green-600" /> : <SlUserFemale className="mr-2 mt-1 text-green-600 " />}
                                                  <div>
                                                       <div>{values.gender}</div>
                                                       <div className="text-sm text-gray-700">Giới tính</div>
                                                  </div>
                                             </div>
                                                  <div className="flex items-start mb-1">
                                                       <AiFillHome className="mr-2 mt-1 text-green-600 " />
                                                       <div>
                                                            <div>{values.address}</div>
                                                            <div className="text-sm text-gray-700">Địa chỉ</div>
                                                       </div>
                                                  </div>
                                        </>
                                   ) : (
                                        <>
                                             <div className="text-base font-bold mb-1">Chỉnh sửa phần giới thiệu</div>
                                             <div>
                                                  {errors.lastName && (
                                                       <div className="flex items-center text-red-500 text-sm mb-1">
                                                            <IoAlertCircleSharp className="text-lg" />
                                                            {errors.lastName}
                                                       </div>
                                                  )}
                                                  <TextField type="text" placeholder="Họ" sx="w-80 md:w-full mb-2" name="lastName" error={errors.lastName ? "border-red-500" : ""} value={values.lastName} onChange={handleChange} disabled={edit ? true : false} />
                                             </div>
                                             <div>
                                                  {errors.firstName && (
                                                       <div className="flex items-center text-red-500 text-sm mb-1">
                                                            <IoAlertCircleSharp className="text-lg" />
                                                            {errors.firstName}
                                                       </div>
                                                  )}
                                                  <TextField type="text" placeholder="Tên" sx="w-80 md:w-full mb-2" name="firstName" error={errors.firstName ? "border-red-500" : ""} value={values.firstName} onChange={handleChange} disabled={edit ? true : false} />
                                             </div>
                                             <TextFieldArea type="text" placeholder="Tiểu sử bản thân" sx="w-52 md:w-full mb-2" name="bio" value={values.bio} onChange={handleChange} disabled={edit ? true : false} />
                                             <div>
                                                  {errors.dateOfBirth && (
                                                       <div className="flex items-center text-red-500 text-sm mb-1">
                                                            <IoAlertCircleSharp className="text-lg" />
                                                            {errors.dateOfBirth}
                                                       </div>
                                                  )}
                                                  <DateInput placeholder="Ngày sinh" sx="w-80 md:w-full mb-1" error={errors.dateOfBirth ? "border-red-500" : ""} selected={values.dateOfBirth} dateFormat="dd/MM/yyyy" onChange={(date) => handleDateOfBirth(date, "dateOfBirth")} disabled={edit ? true : false} />
                                             </div>
                                             <RadioButton onChange={handleChange} name="gender" checked={values.gender} disabled={edit ? true : false} />
                                             <DropdownAddress onChange={handleAddress} />
                                        </>
                                   )}
                              </div>
                              <div className="flex justify-end">
                                   {!edit && (
                                        <Button sx="bg-green-500 hover:bg-green-600" onClick={handleSubmit}>
                                             Cập nhật
                                        </Button>
                                   )}
                              </div>
                         </>
                    </Scrollbar>
               </div>
          </div>
     );
};

export default UserForm;
