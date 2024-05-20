import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../App";
import { profileDataStructure } from "./profile.page";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import InputBox from "../components/input.component";
import { uploadToCloudinary } from "../common/cloundinary";
import { storeInSession } from "../common/session";
import { getFullDay } from "../common/date";

const EditProfile = () => {
  let {
    userAuth,
    userAuth: { access_token, role },
    setUserAuth,
  } = useContext(UserContext);

  let bioLimit = 150;

  let profileImgEle = useRef();
  let editProfileForm = useRef();

  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);
  const [characterLeft, setCharacterLeft] = useState(bioLimit);
  const [updatedProfileImg, setUpdatedProfileImg] = useState(null);

  let {
    personal_info: {
      fullname,
      username: profile_username,
      profile_img,
      email,
      clas,
      faculty,
      dateOfBirth,
      bio,
      gender,
    },
    social_links,
  } = profile;

  useEffect(() => {
    if (access_token) {
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", {
          username: userAuth.username,
        })
        .then(({ data }) => {
          setProfile(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [access_token]);

  const handleCharacterChange = (e) => {
    setCharacterLeft(bioLimit - e.target.value.length);
  };

  const handleImagePreview = (e) => {
    let img = e.target.files[0];

    profileImgEle.current.src = URL.createObjectURL(img);

    setUpdatedProfileImg(img);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();

    if (updatedProfileImg) {
      let loadingToast = toast.loading("Đang tải lên....");
      e.target.setAttribute("disabled", true);

      uploadToCloudinary(updatedProfileImg)
        .then((url) => {
          if (url) {
            axios
              .post(
                import.meta.env.VITE_SERVER_DOMAIN + "/update-profile-img",
                { url },
                {
                  headers: {
                    'Authorization': `Bearer ${access_token}`,
                  },
                }
              )
              .then(({ data }) => {
                let newUserAuth = {
                  ...userAuth,
                  profile_img: data.profile_img,
                };

                storeInSession("user", JSON.stringify(newUserAuth));
                setUserAuth(newUserAuth);

                setUpdatedProfileImg(null);

                toast.dismiss(loadingToast);
                e.target.removeAttribute("disabled");
                toast.success("Đã tải ảnh");
              })
              .catch(({ response }) => {
                toast.dismiss(loadingToast);
                e.target.removeAttribute("disabled");
                toast.error(response.data.error);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let form = new FormData(editProfileForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    let {
      username,
      clas,
      faculty,
      dateOfBirth,
      bio,
      gender,
      youtube,
      facebook,
      twitter,
      github,
      instagram,
      website,
    } = formData;

    if (bio.length > bioLimit) {
      return toast.error(`Mô tả không thể nhiều hơn ${bioLimit} ký tự`);
    }

    let loadingToast = toast.loading("Đang tải lên....");
    e.target.setAttribute("disabled", true);

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/update-profile",
        {
          username,
          clas,
          faculty,
          dateOfBirth,
          bio,
          gender,
          social_links: {
            youtube,
            facebook,
            twitter,
            github,
            instagram,
            website,
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        if (userAuth.username != data.username) {
          let newUserAuth = { ...userAuth, username: data.username };

          storeInSession("user", JSON.stringify(newUserAuth));
          setUserAuth(newUserAuth);
        }
        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        toast.success("Đã cập nhật thông tin");
      })
      .catch(({ response }) => {
        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        toast.error(response.data.error);
      });
  };

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <form ref={editProfileForm}>
          <Toaster />

          <h1 className="max-md:hidden">Chỉnh Sửa Thông Tin</h1>

          <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
            <div className="max-lg:center mb-5">
              <label
                htmlFor="uploadImg"
                id="profileImgLable"
                className="relative block w-48 h-48 bg-grey rounded-full overflow-hidden"
              >
                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/30 opacity-0 hover:opacity-100 cursor-pointer">
                  Chọn ảnh
                </div>
                <img ref={profileImgEle} src={profile_img} />
              </label>

              <input
                type="file"
                id="uploadImg"
                accept=".jpeg, .png, .jpg"
                hidden
                onChange={handleImagePreview}
              />
              <button
                onClick={handleImageUpload}
                className="btn-light mt-5 max-lg:center lg:w-full px-10"
              >
                Tải ảnh lên
              </button>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                <div className="">
                  <InputBox
                    name="fullname"
                    type="text"
                    value={fullname}
                    placeholer="Họ và tên"
                    disable={true}
                    icon="fi-rr-user"
                  />
                </div>

                <div className="">
                  <InputBox
                    name="email"
                    type="email"
                    value={email}
                    placeholer="Email"
                    disable={true}
                    icon="fi-rr-envelope"
                  />
                </div>
              </div>

              <InputBox
                name="username"
                type="text"
                value={profile_username}
                disable={true}
                placeholer="Tên tài khoản"
                icon="fi-rr-at"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                <div className="">
                  <InputBox
                    name="clas"
                    type="text"
                    value={clas}
                    placeholer="Lớp"
                    disable={true}
                    icon="fi-rr-book-alt"
                  />
                </div>

                <div className="">
                  <InputBox
                    name="faculty"
                    type="text"
                    value={faculty}
                    placeholer="Khoa"
                    disable={true}
                    icon="fi-rr-graduation-cap"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                <div className="">
                  <InputBox
                    name="dateOfBirth"
                    type="text"
                    value={getFullDay(dateOfBirth)}
                    placeholer="Ngày sinh"
                    disable={true}
                    icon="fi-rr-graduation-cap"
                  />
                </div>

                <div className="">
                  <InputBox
                    name="gender"
                    type="text"
                    value={gender}
                    placeholer="Giới tính"
                    disable={true}
                    icon="fi-rr-venus-mars"
                  />
                </div>
              </div>
              <textarea
                name="bio"
                maxLength={bioLimit}
                defaultValue={bio}
                className="input-box h-64 lg:h-40 resize-none leading-7 mt-5 pl-5"
                placeholder="Mô tả"
                onChange={handleCharacterChange}
              ></textarea>
              <p className="mt-1 text-dark-grey">
                {characterLeft} ký tự còn lại
              </p>

              <p className="my-6 text-dark-grey">
                Thêm các liên kết mạng xã hội khác
              </p>
              <div className="gap-x-6 md:grid md:grid-cols-2">
                {Object.keys(social_links).map((key, i) => {
                  let link = social_links[key];

                  return (
                    <InputBox
                      key={i}
                      name={key}
                      type="text"
                      value={link}
                      placeholer="https://"
                      icon={
                        "fi " +
                        (key != "website" ? "fi-brands-" + key : "fi-rr-globe")
                      }
                    />
                  );
                })}
              </div>
              <button
                onClick={handleSubmit}
                className="btn-dark w-auto px-10"
                type="submit"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </form>
      )}
    </AnimationWrapper>
  );
};

export default EditProfile;
