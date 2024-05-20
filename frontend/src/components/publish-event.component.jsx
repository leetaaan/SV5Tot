import React, { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { EditorEventContext } from "../pages/editor.sv5tot.page";

const PublishEvent = () => {
  let characterLimit = 200;

  let {
    event,
    event: { banner, title, des, content },
    setEditorState,
    setEvent,
  } = useContext(EditorEventContext);

  let { userAuth: { access_token }} = useContext(UserContext)

  let  navigate = useNavigate()

  const handleCloseEvent = () => {
    setEditorState("event");
  };

  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setEvent({ ...event, title: input.value });
  };

  const handleBlogDesChange = (e) => {
    let input = e.target;
    setEvent({ ...event, des: input.value });
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const publishBlog = (e) => {
    if(e.target.className.includes("disable")){
      return
    }
    if(!title.length){
      return toast.error("Nhập tiêu đề trước khi đăng")
    }

    let loadingToat = toast.loading("Đang đăng....")
    e.target.classList.add('disable')
    let eventObj = {
      title, banner, des, content
    }
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/create-event', eventObj, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(() => {
      e.target.classList.remove('disable')
      toast.dismiss(loadingToat)
      toast.success("Đã đăng")
      setTimeout(() => {
        navigate("/")
      }, 500)
    })
    .catch(({response}) => {
      e.target.classList.remove('disable')
      toast.dismiss(loadingToat)

      return toast.error(response.data.error)
    })
  }
  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <Toaster />
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleCloseEvent}
        >
          <i className="fi fi-br-cross"></i>
        </button>
        <div className="max-w-[550px] center">
          <p className="text-dark-grey mb-1">Xem trước</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="text-xl font-gelasio line-clamp-2 leading-7 mt-4">
            {des}
          </p>
        </div>
        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Tiêu đề</p>
          <input
            type="text"
            placeholder="blog title"
            defaultValue={title}
            className="input-box pl-4"
            onChange={handleBlogTitleChange}
          />
          <button className="btn-dark px-8" onClick={publishBlog}>Gửi</button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishEvent;
