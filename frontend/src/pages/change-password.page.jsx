import React, { useContext, useRef } from "react";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../App";

const ChangePassword = () => {
  let { userAuth: { access_token }} = useContext(UserContext)

  let ChangePasswordForm = useRef();

  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

  const handleSubmit = (e) => {
    e.preventDefault();

    let form = new FormData(ChangePasswordForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { currentPassword, newPassword } = formData;

    if (!currentPassword.length || !newPassword.length) {
      return toast.error("Vui lòng nhập dữ liệu");
    }

    if(!passwordRegex.test(currentPassword) || !passwordRegex.test(newPassword)){
        return toast.error("Mật khẩu phải từ 6 đến 20 ký tự bao gồm ít nhất 1 số, 1 ký tự thường, 1 ký tự hoa")
    }

    e.target.setAttribute("disabled", true)

    let loadingToast = toast.loading("Đang cập nhật....")

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/change-password", formData, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      })
      .then(() => {
        toast.dismiss(loadingToast)
        e.target.removeAttribute("disabled", true)
        return toast.success("Mật khẩu đã được đổi")
      })
      .catch(({ response }) => {
        toast.dismiss(loadingToast)
        e.target.removeAttribute("disabled", true)
        return toast.error(response.data.error)
      })
  };

  return (
    <AnimationWrapper>
      <Toaster />
      <form ref={ChangePasswordForm}>
        <h1 className="max-md:hidden">Đổi mật khẩu</h1>

        <div className="py-10 w-full md:max-w-[400px]">
          <InputBox
            name="currentPassword"
            type="password"
            className="profile-edit-input"
            placeholer="Mật khẩu cũ"
            icon="fi-rr-unlock"
          />

          <InputBox
            name="newPassword"
            type="password"
            className="profile-edit-input"
            placeholer="Mật khẩu mới"
            icon="fi-rr-unlock"
          />

          <button
            onClick={handleSubmit}
            className="btn-dark px-10"
            type="submit"
          >
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </AnimationWrapper>
  );
};

export default ChangePassword;
