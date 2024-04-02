import React, { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import Tag from "./tags.component";

const PublishForm = () => {
  let characterLimit = 200;
  let tagLimit = 5;

  let {
    blog,
    blog: { banner, title, tags, des },
    setEditorState,
    setBlog,
  } = useContext(EditorContext);

  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, title: input.value });
  };

  const handleBlogDesChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, des: input.value });
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let tag = e.target.value;
      console.log(tag);
      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        } else {
          toast.error(`Bạn chỉ có thể thêm tối đa ${tagLimit} thư viện`);
        }
      }
      e.target.value = "";
    }
  };

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

          <p className="text-dark-grey mb-2 mt-9">Mô tả ngắn</p>
          <textarea
            maxLength={characterLimit}
            defaultValue={des}
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={handleBlogDesChange}
            onKeyDown={handleTitleKeyDown}
          ></textarea>

          <p className="mt-1 text-dark-grey text-sm text-right">
            {characterLimit - (des ? des.length : 0)} Ký tự còn lại
          </p>

          <p className="text-dark-grey mb-2 mt-9">Chủ đề</p>

          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Chủ đề"
              className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
              onKeyDown={handleKeyDown}
            />
            {tags.map((tag, i) => {
              return <Tag tag={tag} tagIndex={i} key={i} />;
            })}
          </div>
          <p className="mt-1 text-dark-grey mb-4 text-right">
            {tagLimit - (tags ? tags.length : 0)} Thư viện còn lại
          </p>
          <button className="btn-dark px-8">Đăng</button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
