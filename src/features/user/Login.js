import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { BiShow, BiHide } from "react-icons/bi";
import { IoAlertCircleSharp } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import Validation from "./Validation";
import LoadingPage from "../../components/LoadingPage";

export default function Login() {
  const [isVisible, setVisible] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("hidden");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const handleToggle = () => {
    setVisible(!isVisible);
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    if (validationErrors.email === undefined && validationErrors.password === undefined) {
      if (values.email !== "" && values.password !== "") {
        try {
          setError("");
          setLoading();
          await signIn(values.email, values.password);
          setLoading("hidden")
          navigate("/");
        } catch (event) {
          setError("Email hoặc mật khẩu không chính xác!!!");
          setLoading("hidden")
          console.log(event);
        }
      }
    }
  };
  return (
    <div className="h-screen">
      <div className="h-full">
        <div className="flex h-full flex-wrap justify-center">
          <div className="flex items-center justify-center w-2/5">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/meca-9b48b.appspot.com/o/Meca.png?alt=media&token=1e9775df-d503-4bf0-b737-e9392066bb3a"
              className="w-full md:w-1/2"
              alt="logo meca"
            />
          </div>
          <div className="flex justify-center p-2 md:w-2/5 xs:items-center">
            <form onSubmit={handleSubmit}>
              <p className="font-bold uppercase md:text-2xl mb-5">
                Chào mừng bạn đến với chat meca
              </p>
              <p className="text-base mb-5">
                Vui lòng đăng nhập tài khoản của bạn
              </p>
              <p className="text-base mb-2 text-red-500">{error}</p>
              <div className="flex flex-col justify-center items-center">
                {errors.email && (
                  <div className="w-full flex items-center text-red-500 text-sm mb-1">
                    <IoAlertCircleSharp className="text-lg" />
                    {errors.email}
                  </div>
                )}
                <TextField
                  type="text"
                  placeholder="Email"
                  sx="w-80 md:w-full mb-5"
                  error={errors.email ? "border-red-500" : ""}
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="w-full flex items-center text-red-500 text-sm mb-1">
                    <IoAlertCircleSharp className="text-lg" />
                    {errors.password}
                  </div>
                )}
                <TextField
                  type={!isVisible ? "password" : "text"}
                  placeholder="Mật khẩu"
                  sx="w-80 md:w-full mb-5"
                  onClick={handleToggle}
                  error={errors.password ? "border-red-500" : ""}
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                >
                  {isVisible ? <BiHide /> : <BiShow />}
                </TextField>
                <Button
                  type={true}
                  sx="w-80 md:w-full mb-4 bg-gradient-to-r from-[#0097B2] to-[#7ED957] hover:opacity-95"
                >
                  Đăng nhập
                </Button>
              </div>

              <div className="mb-4 flex justify-center">
                <p>Quên mật khẩu?</p>
              </div>
              <p className="text-sm font-semibold text-center">
                Không có tài khoản?
                <Link to="/register">
                  <Button sx="ml-2 mb-2 bg-gradient-to-r from-[#0097B2] to-[#7ED957] hover:opacity-95">
                    Đăng ký
                  </Button>
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
