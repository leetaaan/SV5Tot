import Embed from "@editorjs/embed"
import List from "@editorjs/list"
import Image from "@editorjs/image"
import Header from "@editorjs/header"
import Quote from "@editorjs/quote"
import Marker from "@editorjs/marker"
import InlineCode from "@editorjs/inline-code"
import { uploadToCloudinary } from "../common/cloundinary.jsx"
import { useCallback } from "react"

// const uploadImageByFile = useCallback((e) => {
//     let file = e.target.files[0]
//     let reader = new FileReader()
//     reader.onload = async () => {
//       if(reader.result){
//         const filename = reader.result
//         const url = await uploadToCloudinary(filename)
//         toast.dismiss(loadingToast);
//         toast.success("Đã tải ảnh");
//       }
//       toast.error("Tải ảnh không thành công");
//      }
//      reader.readAsDataURL(file)
//   }, []);

const uploadImageByUrl = (e) => {
    return link.then(url => {
        return {
            success: 1,
            file: { url }
        }
    })
}

export const tools = {
    embed: Embed,
    list: {
        class: List,
        inlineToolbar: true
    },
    image: {
        class: Image,
        config: {
            // endpoints: {
            //     byFile: 'http://res.cloudinary.com/dcl6hjfyu/image/upload/', // Your backend file uploader endpoint
            //     byUrl: 'http://res.cloudinary.com/dcl6hjfyu/image/upload/', // Your endpoint that provides uploading by Url
            //   },
            uploader: {
                uploadByUrl: uploadImageByUrl,
                //uploadByFile: uploadImageByFile
            }
        }},
    header: {
        class: Header,
        config: {
            placeholder: "Nhập tiêu đề của nội dung...",
            levels: [2,3],
            defaultLevel: 2
        }
    },
    quote: {
        class: Quote,
        inlineToolbar: true
    },
    marker: Marker,
    inlineCode: InlineCode,

}

