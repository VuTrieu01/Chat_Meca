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

const EventForm = ({ open, closeButton }) => {
  const uuid = uid();
  const { currentUser } = useAuth();
  const [values, setValues] = useState({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleDateOfBirth = (date, name) => {
    setValues({ ...values, [name]: date });
  };
  const handleSubmit = () => {
    setErrors(Validation(values));
    if (values.startDate.getTime() < values.endDate.getTime()) {
      setError("");
      if (errors.title === undefined && values.title !== "") {
        set(ref(database, `Event` + `/${uuid}`), {
          uid: uuid,
          accountId: currentUser.uid,
          title: values.title,
          startDate: values.startDate.toString(),
          endDate: values.endDate.toString(),
        });
        setValues({ title: "", startDate: new Date(), endDate: new Date() });
        closeButton();
      }
    } else {
      setError("Ngày kết thúc phải lớn hơn ngày bắt đầu!!!");
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
        <h1 className="text-2xl font-semibold">Tạo sự kiện</h1>
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
              placeholder="Tiêu đề"
              sx="w-80 md:w-full mb-5"
              name="title"
              error={errors.title ? "border-red-500" : ""}
              value={values.title}
              onChange={handleChange}
            />
          </div>
          <div>
            {error && (
              <div className="flex items-center text-red-500 text-sm mb-1">
                <IoAlertCircleSharp className="text-lg" />
                {error}
              </div>
            )}
            <DateInput
              placeholder="Ngày bắt đầu"
              sx="w-80 md:w-full mb-3"
              selected={values.startDate}
              onChange={(date) => handleDateOfBirth(date, "startDate")}
              minDate={new Date()}
            />
            <DateInput
              placeholder="Ngày kết thúc"
              sx={`w-80 md:w-full mb-3`}
              selected={values.endDate}
              onChange={(date) => handleDateOfBirth(date, "endDate")}
              minDate={values.startDate}
            />
          </div>
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
