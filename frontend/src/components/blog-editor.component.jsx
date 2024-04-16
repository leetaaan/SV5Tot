import React, { useContext, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from '@editorjs/editorjs'
import { tools } from "./tools.component";
import axios from "axios";
import { UserContext } from "../App";
import { uploadToCloudinary } from "../common/cloundinary";

const BlogEditor = () => {
  let { blog, blog: { title, banner, content, tags, des }, setBlog, textEditor, setTextEditor,
  setEditorState } = useContext(EditorContext)

  let { userAuth: { access_token }} = useContext(UserContext)
  let { blog_id } = useParams()

  let navigate = useNavigate()

  useEffect(() => {
    if(!textEditor.isReady){
      setTextEditor(new EditorJS({
        holderId: "textEditor",
        data: Array.isArray(content) ? content[0] : content,
        tools: tools,
        placeholder: "Viết gì đó"
      }))
    }
  }, [])

  const handleBannerUpload = useCallback((e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.onload = async () => {
      if(reader.result){
        let loadingToast = toast.loading("Đang tải ảnh...")
        const filename = reader.result
        const url = await uploadToCloudinary(filename)
        setBlog({ ...blog, banner: url })
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
     }
     reader.readAsDataURL(file)
  }, []);

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

  const handleSaveDraft = (e) => {
    if(e.target.className.includes("disable")){
      return
    }
    if(!title.length){
      return toast.error("Nhập tiêu đề trước khi lưu")
    }
    let loadingToat = toast.loading("Đang lưu....")
    e.target.classList.add('disable')
    
    if(textEditor.isReady){
      textEditor.save().then(content => {
        let blogObj = {
          title, banner, des, content, tags, draft: true
        }

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/create-blog', {...blogObj, id: blog_id}, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        })
        .then(() => {
          e.target.classList.remove('disable')
          toast.dismiss(loadingToat)
          toast.success("Đã lưu")
          setTimeout(() => {
            navigate("/")
          }, 500)
        })
        .catch(({response}) => {
          e.target.classList.remove('disable')
          toast.dismiss(loadingToat)
    
          return toast.error(response.data.error)
        })
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
          <button className="btn-light py-2" onClick={handleSaveDraft}>Lưu bản nháp</button>
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
