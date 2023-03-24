import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { BiShow, BiHide } from "react-icons/bi";

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
    <div className="h-screen">
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
                Chào mừng bạn đến với chat meca
              </p>
              <p className="text-base mb-5">
                Vui lòng điền đầy đủ thông tin của bạn
              </p>
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
                <Button sx="w-80 md:w-full mb-4 bg-gradient-to-r from-[#0097B2] to-[#7ED957] hover:opacity-95">
                  Đăng ký
                </Button>
              </div>

              <p className="text-sm font-semibold text-center">
                Đã có tài khoản?
                <Link to="/">
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
