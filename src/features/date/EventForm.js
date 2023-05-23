import React, { useState } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import DateInput from "../../components/DateInput";
import { uid } from "uid";
import { useAuth } from "../../context/AuthContext";
import { database } from "../../firebase";
import { ref, set } from "firebase/database";
import Validation from "../../features/user/Validation";
import { IoAlertCircleSharp } from "react-icons/io5";
import CheckBox from "../../components/CheckBox";

const EventForm = ({ open, closeButton }) => {
  const uuid = uid();
  const { currentUser } = useAuth();
  const [values, setValues] = useState({
    title: "",
    contents: "",
    time: new Date(),
    allDay: true,
  });
  const [checked, setChecked] = useState(true);
  const [errors, setErrors] = useState({});
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
  const handleSubmit = () => {
    setErrors(Validation(values));
    if (values.title !== "") {
      set(ref(database, `Event` + `/${uuid}`), {
        uid: uuid,
        accountId: currentUser.uid,
        title: values.title,
        contents: values.contents,
        time: values.time.toString(),
        allDay: values.allDay,
      });
      setValues({ title: "", contents: "", time: new Date() });
      closeButton();
    }
  };
  return (
    <div>
      <div
        className={`fixed ${open} z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60`}
      ></div>
      <div
        className={`fixed ${open} z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-md px-8 py-6 space-y-5 drop-shadow-lg`}
      >
        <h1 className="text-2xl font-semibold">Tạo việc cần làm</h1>
        <div className="py-5 border-t border-b border-gray-300">
          <div>
            {errors.title && (
              <div className="flex items-center text-red-500 text-sm mb-1">
                <IoAlertCircleSharp className="text-lg" />
                {errors.title}
              </div>
            )}
            <TextField
              type="text"
              placeholder="Thêm tiêu đề"
              sx="w-80 md:w-full mb-5"
              name="title"
              error={errors.title ? "border-red-500" : ""}
              value={values.title}
              onChange={handleChange}
            />
          </div>
          <TextField
            type="text"
            placeholder="Thêm chi tiết"
            sx="w-80 md:w-full mb-5"
            name="contents"
            value={values.contents}
            onChange={handleChange}
          />
          <DateInput
            placeholder="Thời gian"
            sx="w-80 md:w-full mb-3"
            selected={values.time}
            dateFormat={checked ? "dd/MM/yyyy" : "dd/MM/yyyy hh:mm aa"}
            onChange={(date) => handleDateOfBirth(date, "time")}
            minDate={new Date()}
          />
          <CheckBox checked={checked} onChange={handleChecked} />
        </div>
        <div className="flex justify-end">
          <Button sx="bg-green-500 hover:bg-green-600" onClick={handleSubmit}>
            Lưu
          </Button>
          <Button
            sx="bg-green-500 hover:bg-green-600 ml-2"
            onClick={closeButton}
          >
            Trở lại
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
