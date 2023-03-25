import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { BiShow, BiHide } from "react-icons/bi";
import DatePicker from "../../components/DatePicker";
import RadioButton from "../../components/RadioButton";

export default function Register() {
  const [isVisible, setVisible] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const handleToggle = () => {
    setVisible(!isVisible);
  };
  const handPasswordConfirm = () => {
    setPasswordConfirm(!passwordConfirm);
  };
  return (
    <div className="h-screen ">
      <div className="h-full">
        <div className="flex h-full flex-wrap justify-center">
          <div className="flex items-center justify-center w-2/5">
            <img
              src="favicon.ico"
              className="w-full md:w-1/2"
              alt="logo meca"
            />
          </div>
          <div className="flex justify-center p-2 md:w-2/5 xs:items-center">
            <form>
              <p className="font-bold uppercase md:text-2xl mb-5">
                Tạo tài khoản mới
              </p>
              <p className="text-base mb-5">
                Vui lòng điền đầy đủ thông tin của bạn
              </p>
              <div className="flex flex-col md:flex-row">
                <TextField type="text" placeholder="Họ" sx="w-full mb-5 mr-2" />
                <TextField type="text" placeholder="Tên" sx="w-full mb-5" />
              </div>
              <div className="flex flex-col justify-center items-center">
                <TextField
                  type="text"
                  placeholder="Email"
                  sx="w-80 md:w-full mb-5"
                />
                <TextField
                  type={!isVisible ? "password" : "text"}
                  placeholder="Mật khẩu"
                  sx="w-80 md:w-full mb-5"
                  onClick={handleToggle}
                >
                  {isVisible ? <BiHide /> : <BiShow />}
                </TextField>
                <TextField
                  type={!passwordConfirm ? "password" : "text"}
                  placeholder="Nhập lại mật khẩu"
                  sx="w-80 md:w-full mb-5"
                  onClick={handPasswordConfirm}
                >
                  {passwordConfirm ? <BiHide /> : <BiShow />}
                </TextField>
                <DatePicker
                  type="date"
                  placeholder="Ngày sinh"
                  sx="w-80 md:w-full mb-5"
                />
                <RadioButton />
                <Button sx="w-80 md:w-full mb-4 bg-gradient-to-r from-[#0097B2] to-[#7ED957] hover:opacity-95">
                  Đăng ký
                </Button>
              </div>
              <p className="text-sm font-semibold text-center">
                Đã có tài khoản?
                <Link to="/login">
                  <Button sx="ml-2 mb-2 bg-gradient-to-r from-[#0097B2] to-[#7ED957] hover:opacity-95">
                    Đăng nhập
                  </Button>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
