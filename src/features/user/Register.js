import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { BiShow, BiHide } from "react-icons/bi";
import DateInput from "../../components/DateInput";
import RadioButton from "../../components/RadioButton";
import { IoAlertCircleSharp } from "react-icons/io5";
import Validation from "./Validation";
import { child, onValue, ref, set } from "firebase/database";
import { database } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import LoadingPage from "../../components/LoadingPage";
import DropdownAddress from "../../components/DropdownAddress";

export default function Register() {
     const [isVisible, setVisible] = useState(false);
     const [passwordConfirm, setPasswordConfirm] = useState(false);
     const [values, setValues] = useState({
          lastName: "",
          firstName: "",
          email: "",
          password: "",
          passwordConfirm: "",
          dateOfBirth: new Date(),
          gender: "Nữ",
          address: "",
     });
     const [errors, setErrors] = useState({});
     const [error, setError] = useState("");
     const [loading, setLoading] = useState("hidden");
     const dbRef = ref(database);
     const { signup } = useAuth();
     const [listEmail, setListEmail] = useState([]);
     const navigate = useNavigate();
     const handleToggle = () => {
          setVisible(!isVisible);
     };
     const handPasswordConfirm = () => {
          setPasswordConfirm(!passwordConfirm);
     };
     const handleChange = (e) => {
          if (e.target) setValues({ ...values, [e.target.name]: e.target.value });
     };
     const handleDateOfBirth = (date, name) => {
          setValues({ ...values, [name]: date });
     };
     const handleAddress = (address, name) => {
          setValues({ ...values, [name]: address });
     };
     useEffect(() => {
          onValue(child(dbRef, `Account`), (snapshot) => {
               setListEmail([]);
               const data = snapshot.val();
               if (data !== null) {
                    Object.values(data).map((item) => {
                        return setListEmail((oldArray) => [...oldArray, item]);
                    });
               }
          });
     }, [dbRef]);
     const handleSubmit = async (e) => {
          e.preventDefault();
          const validationErrors = Validation(values);
          setErrors(validationErrors);
          if (validationErrors.lastName === undefined && validationErrors.firstName === undefined && validationErrors.email === undefined && validationErrors.password === undefined && validationErrors.passwordConfirm === undefined && validationErrors.dateOfBirth === undefined) {
               if (values.lastName !== "" && values.firstName !== "" && values.email !== "" && values.password !== "" && values.passwordConfirm !== "" && values.dateOfBirth !== "") {
                    if (listEmail.map((item) => item.email).find((a) => a === values.email) !== undefined) {
                         setError("Email đã tồn tại!!!");
                    } else {
                         try {
                              setError("");
                              setLoading();
                              const res = await signup(values.email, values.password);
                              set(ref(database, `Account/${res.user.uid}`), {
                                   uid: res.user.uid,
                                   lastName: values.lastName,
                                   firstName: values.firstName,
                                   email: values.email,
                                   dateOfBirth: moment(values.dateOfBirth).format("YYYY-MM-DD"),
                                   gender: values.gender,
                                   address: values.address,
                              })
                                   .then(() => {
                                        setLoading("hidden")
                                        console.log("Success");
                                   })
                                   .catch((error) => {
                                        setLoading("hidden")
                                        console.log(error);
                                   });
                              setLoading("hidden")
                              navigate("/");
                         } catch (e) {
                              setError("Tạo tài khoản thất bại!!!");
                              console.log(e);
                         }
                    }
               }
          }
     };

     return (
          <div className="h-screen ">
               <div className="h-full">
                    <div className="flex h-full flex-wrap justify-center">
                         <div className="flex items-center justify-center w-2/5">
                              <img src="https://firebasestorage.googleapis.com/v0/b/meca-9b48b.appspot.com/o/Meca.png?alt=media&token=1e9775df-d503-4bf0-b737-e9392066bb3a" className="w-full md:w-1/2" alt="logo meca" />
                         </div>
                         <div className="flex justify-center p-2 md:w-2/5 xs:items-center">
                              <form onSubmit={handleSubmit}>
                                   <p className="font-bold uppercase md:text-2xl mb-3">Tạo tài khoản mới</p>
                                   <p className="text-base mb-2">Vui lòng điền đầy đủ thông tin của bạn</p>
                                   <p className="text-base mb-2 text-red-500">{error}</p>
                                   <div className="flex flex-col md:flex-row">
                                        <div className="mb-3 md:mr-2">
                                             {errors.lastName && (
                                                  <div className="flex items-center text-red-500 text-sm mb-1">
                                                       <IoAlertCircleSharp className="text-lg" />
                                                       {errors.lastName}
                                                  </div>
                                             )}
                                             <TextField type="text" placeholder="Họ" sx="w-full" error={errors.lastName ? "border-red-500" : ""} value={values.lastName} name="lastName" onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                             {errors.firstName && (
                                                  <div className="flex items-center text-red-500 text-sm mb-1">
                                                       <IoAlertCircleSharp className="text-lg" />
                                                       {errors.firstName}
                                                  </div>
                                             )}
                                             <TextField type="text" placeholder="Tên" sx="w-full" error={errors.firstName ? "border-red-500" : ""} value={values.firstName} name="firstName" onChange={handleChange} />
                                        </div>
                                   </div>
                                   <div className="flex flex-col justify-center items-center">
                                        {errors.email && (
                                             <div className="w-full flex items-center text-red-500 text-sm mb-1">
                                                  <IoAlertCircleSharp className="text-lg" />
                                                  {errors.email}
                                             </div>
                                        )}
                                        <TextField type="text" placeholder="Email" sx="w-80 md:w-full mb-3" error={errors.email ? "border-red-500" : ""} value={values.email} name="email" onChange={handleChange} />
                                        {errors.password && (
                                             <div className="w-full flex items-center text-red-500 text-sm mb-1">
                                                  <IoAlertCircleSharp className="text-lg" />
                                                  {errors.password}
                                             </div>
                                        )}
                                        <TextField type={!isVisible ? "password" : "text"} placeholder="Mật khẩu" sx="w-80 md:w-full mb-3" onClick={handleToggle} error={errors.password ? "border-red-500" : ""} value={values.password} name="password" onChange={handleChange}>
                                             {isVisible ? <BiHide /> : <BiShow />}
                                        </TextField>
                                        {errors.passwordConfirm && (
                                             <div className="w-full flex items-center text-red-500 text-sm mb-1">
                                                  <IoAlertCircleSharp className="text-lg" />
                                                  {errors.passwordConfirm}
                                             </div>
                                        )}
                                        <TextField type={!passwordConfirm ? "password" : "text"} placeholder="Nhập lại mật khẩu" sx="w-80 md:w-full mb-3" onClick={handPasswordConfirm} error={errors.passwordConfirm ? "border-red-500" : ""} value={values.passwordConfirm} name="passwordConfirm" onChange={handleChange}>
                                             {passwordConfirm ? <BiHide /> : <BiShow />}
                                        </TextField>
                                        {errors.dateOfBirth && (
                                             <div className="w-full flex items-center text-red-500 text-sm mb-1">
                                                  <IoAlertCircleSharp className="text-lg" />
                                                  {errors.dateOfBirth}
                                             </div>
                                        )}
                                        <DateInput placeholder="Ngày sinh" sx="w-80 md:w-full mb-3" error={errors.dateOfBirth ? "border-red-500" : ""} selected={values.dateOfBirth} dateFormat="dd/MM/yyyy" onChange={(date) => handleDateOfBirth(date, "dateOfBirth")} />
                                        <DropdownAddress onChange={handleAddress}/>
                                        <RadioButton onChange={handleChange} name="gender" checked={values.gender} />
                                        <Button type={true} sx="w-80 md:w-full mb-4 bg-gradient-to-r from-[#0097B2] to-[#7ED957] hover:opacity-95">
                                             Đăng ký
                                        </Button>
                                   </div>
                                   <p className="text-sm font-semibold text-center">
                                        Đã có tài khoản?
                                        <Link to="/login">
                                             <Button sx="ml-2 mb-2 bg-gradient-to-r from-[#0097B2] to-[#7ED957] hover:opacity-95">Đăng nhập</Button>
                                        </Link>
                                   </p>
                              </form>
                         </div>
                    </div>
                    <LoadingPage openLoading={loading}/>
               </div>
          </div>
     );
}
