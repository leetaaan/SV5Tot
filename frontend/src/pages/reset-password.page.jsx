import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AnimationWrapper from "../common/page-animation";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/reset-password/" + token, {
        password,
      })
      .then((response) => {
        if (response.data.status) {
          navigate("/signin");
        }
        console.log(response.data);
      })
      .catch((err) => {
        alert(err);
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
              placeholder="Mật khẩu"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="input-box"
            />
            <i className={"fi fi-rr-envelope input-icon"}></i>
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
