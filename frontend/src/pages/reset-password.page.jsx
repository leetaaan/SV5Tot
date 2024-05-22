import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AnimationWrapper from "../common/page-animation";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [passwordVisible, SetPasswordVisible] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/reset-password/${id}/${token}`,
        {
          password,
        }
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AnimationWrapper>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form onSubmit={handleSubmit} className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            Đặt lại mật khẩu
          </h1>
          <div className="relative w-[100%] mb-4">
            <input
            name="password"
              placeholder="Mật khẩu"
              type={"password" ? (passwordVisible ? "text" : "password") : ""}
              onChange={(e) => setPassword(e.target.value)}
              className="input-box"
            />
            <i className={"fi fi-rr-envelope input-icon"}></i>
            <i
              className={
                "fi fi-rr-eye" +
                (!passwordVisible ? "-crossed" : "") +
                " input-icon left-[auto] right-4 cursor-pointer"
              }
              onClick={() => SetPasswordVisible((currentVal) => !currentVal)}
            ></i>
          </div>
          <button className="btn-dark center mt-14" type="submit">
            Xác nhận
          </button>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default ResetPasswordForm;
