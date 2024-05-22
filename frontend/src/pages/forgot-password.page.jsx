import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AnimationWrapper from "../common/page-animation";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.setAttribute("disabled", true);
    axios
    .post(import.meta.env.VITE_SERVER_DOMAIN + "/forgot-password", { email })
    .then((response) => {
      if (response.data.status) {
        alert("Vui lòng kiểm tra email....")
        navigate("/signin");
      }
      })
      .catch((err) => {
        alert(err)
      });
  };
  return (
    <AnimationWrapper>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form onSubmit={handleSubmit} className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            Quên mật khẩu
          </h1>
          <div className="relative w-[100%] mb-4">
            <input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPasswordForm;
