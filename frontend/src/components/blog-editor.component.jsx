import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from '@editorjs/editorjs'
import { tools } from "./tools.component";

const BlogEditor = () => {
  let { blog, blog: { title, banner, content, tag, des }, setBlog, textEditor, setTextEditor,
  setEditorState } = useContext(EditorContext)

  useEffect(() => {
    setTextEditor(new EditorJS({
      holderId: "textEditor",
      data: content,
      tools: tools,
      placeholder: "Viết gì đó"
    }))
  }, [])

  const handleBannerUpload = (e) => {
    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      let loadingToast = toast.loading("Đang tải ảnh...")
      toast.dismiss(loadingToast);
      toast.success("Đã tải ảnh");
      setBlog({ ...blog, banner: reader.result })
    }
    reader.onerror = err => {
      toast.dismiss(loadingToast);
      return toast.error(err);
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
    }
  }

  const handleTitleChange = (e) => {
    let input = e.target

    input.style.height = 'auto'
    input.style.height = input.scrollHeight + 'px'
    console.log(blog);
    setBlog({ ...blog, title: input.value })
  }

  const handlePushlish = () => {
    if(!banner.length){
      return toast.error("Vui lòng thêm ảnh bìa để đăng")
    }
    if(!title.length){
      return toast.error("Vui lòng thêm tiêu đề để đăng")
    }
    if(textEditor.isReady){
      textEditor.save().then(data => {
        if(data.blocks.length){
          setBlog({...blog, content: data})
          setEditorState("pushlish")
        }else {
          return toast.error("Vui lòng thêm mô tả để đăng")
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title.length ? title : "Bài viết mới"}
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handlePushlish}>Đăng</button>
          <button className="btn-light py-2">Lưu bản nháp</button>
        </div>
      </nav>

      <AnimationWrapper>
        <Toaster />
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                {
                  banner == "" || banner == null ?
                <img src={defaultBanner} className="z-20" />
                : <img src={banner} className="z-20" />
                }
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
            <textarea
              defaultValue={title}
              placeholder="Tiêu đề"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>
            <hr className="w-full opacity-10 my-5"/>

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
