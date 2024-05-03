import React, { useContext, useRef } from "react";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  console.log(access_token);
  const userAuthThroughServer = (serverRoute, formData) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));

        setUserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "sign-in" ? "/signin" : "/signup";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    let form = new FormData(formElement);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { fullname, email, password } = formData;

    if (fullname) {
      if (fullname.length < 5) {
        return toast.error("Họ và tên phải nhiều hơn 5 ký tự");
      }
    }
    if (!email.length) {
      return toast.error("Nhập email");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Email không đúng");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Mật khẩu phải từ 6 đến 20 ký tự bao gồm số, 1 ký tự thường, 1 ký tự hoa"
      );
    }

    userAuthThroughServer(serverRoute, formData);
  };

  const handleGoogleAuth = async (e) => {
    e.preventDefault()

    authWithGoogle().then(user => {
      let serverRoute = "/google-auth"
      let formData = {
        access_token: user.accessToken
      }
      userAuthThroughServer(serverRoute, formData)
    })
    .catch(err => {
      toast.err('Có lỗi khi đăng nhập bằng google')
      return console.log(err);
    })
  }
  return(
    access_token ? <Navigate to="/" />
   :
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form id="formElement" className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign-in" ? "Đăng nhập" : "Đăng ký"}
          </h1>
          {type != "sign-in" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholer="Họ và tên"
              icon="fi-rr-user"
            />
          ) : (
            ""
          )}
          <InputBox
            name="email"
            type="email"
            placeholer="Email"
            icon="fi-rr-envelope"
          />
          <InputBox
            name="password"
            type="password"
            placeholer="Mật khẩu"
            icon="fi-rr-key"
          />

          <button
            className="btn-dark center mt-14"
            type="submit"
            onClick={handleSubmit}
          >
            Đăng nhập
          </button>
          <div
            className="relative w-full flex items-center gap-2 my-10 
                opacity-10 uppercase text-black font-bold"
          >
            <hr className="w-1/2 border-black" />
            <p>Hoặc</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
          onClick={handleGoogleAuth}>
            <img src={googleIcon} className="w-5" />
            Tiếp tục bằng Google
          </button>
          {type === "sign-in" ? (
            ""
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Đã có tài khoản ?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Đăng nhập tại đây.
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
