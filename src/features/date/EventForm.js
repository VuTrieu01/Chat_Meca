import React, { useState } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import DateInput from "../../components/DateInput";
import { uid } from "uid";
import { useAuth } from "../../context/AuthContext";
import { database } from "../../firebase";
import { child, ref, set, update } from "firebase/database";
import Validation from "../../features/user/Validation";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IoAlertCircleSharp, IoCloseSharp } from "react-icons/io5";
import CheckBox from "../../components/CheckBox";
import MessengerBox from "../../components/MessengerBox";
import moment from "moment";

const EventForm = ({ title, editEvent, deleteItem, open, closeButton, dataEvent }) => {
     const dbRef = ref(database);
     const { currentUser } = useAuth();
     const uuid = uid();
     const [values, setValues] = useState({
          title: dataEvent ? dataEvent.title : "",
          contents: dataEvent ? dataEvent.contents : "",
          time: dataEvent ? new Date(dataEvent.time) : new Date(),
          allDay: dataEvent ? dataEvent.allDay : true,
     });
     const [checked, setChecked] = useState(values.allDay);
     const [errors, setErrors] = useState({});
     const [edit, setEdit] = useState(editEvent);
     const [openMessenger, setOpenMessenger] = useState("hidden");
     const handleChange = (e) => {
          setValues({ ...values, [e.target.name]: e.target.value });
     };
     const handleDateOfBirth = (date, name) => {
          setValues({ ...values, [name]: date });
     };
     const handleChecked = () => {
          setChecked(!checked);
          setValues({ ...values, allDay: !checked });
     };
     const handleEdit = () => {
          setEdit(false);
     };
     const handleDelete = () => {
          setOpenMessenger("");
     };
     const handleClose = () => {
          setValues({ title: "", contents: "", time: new Date(), allDay: true });
          setChecked(true);
          closeButton();
     };
     const handleDone = () => {
          update(child(dbRef, `Event/${dataEvent.uid}`), {
               done: true,
          });
          closeButton();
     };
     const handleSubmit = () => {
          setErrors(Validation(values));
          if (values.title !== "") {
               if (editEvent) {
                    return (
                         update(child(dbRef, `Event/${dataEvent.uid}`), {
                              title: values.title,
                              contents: values.contents,
                              time: values.allDay === true ? moment(values.time).startOf("day").toDate().toString() : values.time.toString(),
                              allDay: values.allDay,
                              done: false,
                         }),
                         setValues({
                              title: "",
                              contents: "",
                              time: new Date(),
                              allDay: true,
                         }),
                         setChecked(true),
                         closeButton()
                    );
               }

               set(ref(database, `Event/${uuid}`), {
                    uid: uuid,
                    accountId: currentUser.uid,
                    title: values.title,
                    contents: values.contents,
                    time: values.allDay === true ? moment(values.time).startOf("day").toDate().toString() : values.time.toString(),
                    allDay: values.allDay,
                    done: false,
               });
               setValues({ title: "", contents: "", time: new Date(), allDay: true });
               setChecked(true);
               closeButton();
          }
     };
     return (
          <div>
               <div className={`fixed ${open} z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60`}></div>
               <MessengerBox data={dataEvent} openMessenger={openMessenger} closeMessenger={setOpenMessenger} />
               <div className={`fixed ${open} z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-md px-8 py-6 drop-shadow-lg`}>
                    <div className="flex justify-end">
                         {edit && (
                              <div title="Chỉnh sửa" className="cursor-pointer hover:bg-gray-200 p-2 rounded-full" onClick={handleEdit}>
                                   <AiOutlineEdit />
                              </div>
                         )}
                         {deleteItem && (
                              <>
                                   <div title="Xóa" className="cursor-pointer hover:bg-gray-200 p-2 rounded-full" onClick={handleDelete}>
                                        <AiOutlineDelete />
                                   </div>
                              </>
                         )}
                         <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-full" onClick={handleClose}>
                              <IoCloseSharp />
                         </div>
                    </div>
                    <div className="text-2xl font-bold mb-5">{title}</div>
                    <div className="py-5 border-t border-b border-gray-300 mb-5">
                         <div>
                              {errors.title && (
                                   <div className="flex items-center text-red-500 text-sm mb-1">
                                        <IoAlertCircleSharp className="text-lg" />
                                        {errors.title}
                                   </div>
                              )}
                              <TextField type="text" placeholder="Tiêu đề" sx="w-80 md:w-full mb-5" name="title" error={errors.title ? "border-red-500" : ""} value={values.title} onChange={handleChange} disabled={edit ? true : false} />
                         </div>
                         <TextField type="text" placeholder="Chi tiết" sx="w-80 md:w-full mb-5" name="contents" value={values.contents} onChange={handleChange} disabled={edit ? true : false} />
                         <DateInput placeholder="Thời gian" sx="w-80 md:w-full mb-3" selected={values.time} dateFormat={checked ? "dd/MM/yyyy" : "dd/MM/yyyy hh:mm aa"} onChange={(date) => handleDateOfBirth(date, "time")} minDate={new Date()} showTimeInput={!checked ? true : false} disabled={edit ? true : false} />
                         <CheckBox checked={checked} onChange={handleChecked} disabled={edit ? true : false} />
                    </div>
                    <div className="flex justify-end">
                         {!edit && (
                              <Button sx="bg-green-500 hover:bg-green-600" onClick={handleSubmit}>
                                   Lưu
                              </Button>
                         )}
                         {edit && dataEvent.done !== true && (
                              <Button sx="bg-green-500 hover:bg-green-600" onClick={handleDone}>
                                   Hoàn thành
                              </Button>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default EventForm;
