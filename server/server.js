import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import bcrypt from 'bcrypt'
import User from './Schema/User.js'
import Blog from './Schema/Blog.js'
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import cors from "cors"
import admin from "firebase-admin"
import serviceAccountKey from "./sinh-vien-5tot-firebase-adminsdk-355hd-ac4e4aa098.json" assert { type: "json" }
import { getAuth } from "firebase-admin/auth"

const server = express();
let PORT =3000;


admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
})

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json())
mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
})
server.use(cors())



const formatDatatoSend = (user) => {

    const access_token = jwt.sign({ id: user._id },process.env.SECRET_ACCESS_KEY)
    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname,
    }
}

const generateUsername = async (email) => {
    let username = email.split("@")[0];

    let isUsernameNotUnique = await User.exists({"personal_info.username": username }).then((result) => result)

    isUsernameNotUnique ? username += nanoid().substring(0, 5) : "";

    return username
}

const generateUploadURL = (blog) => {
    const date = new Date()
    const imageName = `${nanoid()}-${date.getTime()}.jpeg`
    return {
        banner: blog.banner
    }
}

server.post("/get-upload-url", (req, res) => {
    const {base64}=req.body
    try{
        Image.create({image:base64})
        res.send({Status:"ok"})
    }
    catch(error){
        res.send({Status: "error", data:error})
    }
    // generateUploadURL().then(url => res.status(200).json({uploadUrl : url}))
    // .catch(err => {
    //     console.log(err.message);
    //     return res.status(500).json({ "Lỗi": err.message })
    // })
})

server.post("/signup", (req, res) => {
    let {fullname, email, password} = req.body

    if(fullname.length < 5){
        return res.status(403).json({"Lỗi": "Họ và tên phải nhiều hơn 5 ký tự"})
    }
    if(!email.length){
        return res.status(403).json({"Lỗi": "Nhập email"})
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({"Lỗi": "Email không đúng"})
    }
    if(!passwordRegex.test(password)){
        return res.status(403).json({"Lỗi": "Mật khẩu phải từ 6 đến 20 ký tự bao gồm số, 1 ký tự thường, 1 ký tự hoa"})
    }
    bcrypt.hash(password, 10, async (err, hashed_password) => {
        let username = await generateUsername(email)
        let user = new User({
            personal_info:{ fullname, email, password: hashed_password, username }
        })

        user.save().then((u) => {
            return res.status(200).json(formatDatatoSend(u))
        })
        .catch(err => {
            if(err.code === 11000){
                return res.status(500).json({ "Lỗi": "Email đã được sử dụng" })
            }
            return res.status(500).json({ "Lỗi": err.message })
        })

        console.log(hashed_password);
    })  
})
server.post("/signin", (req, res) => {

    let { email, password } = req.body

    User.findOne({ "personal_info.email": email })
    .then((user) => {
        if(!user){
            return res.status(403).json({ "Lỗi": "Email không được tìm thấy"})
        }

        if(!user.google_auth){
            bcrypt.compare(password, user.personal_info.password, (err, result) => {
                if(err){
                    return res.status(403).json({ "Lỗi": "Lỗi trong khi đăng nhập vui lòng thử lại"})
                }
                if(!result){
                    return res.status(403).json({ "Lỗi": "Mật khẩu không đúng"})
                }else{
                    return res.status(200).json(formatDatatoSend(user))
                }
            })
        } else {
            return res.status(403).json({ "Lỗi": "Tài khoản đã được tạo bằng Google. Vui lòng thử đăng nhập bằng Google"})
        }


    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json({ "Lỗi": err.message })
    })
})

server.post("/google-auth", async (req, res) => {

    let { access_token } = req.body

    getAuth()
    .verifyIdToken(access_token)
    .then(async (decodecUser) => {

        let { email, name, picture } =decodecUser

        picture = picture.replace("s96-c", "s384-c")

        let user = await User.findOne({"personal_info.email": email})
        .select("personal_info.fullname personal_info.username personal_info.profile_img google_auth")
        .then((u) => {
            return u || null
        })
        .catch(err => {
            return res.status(500).json({ "Lỗi": err.message })
        })

        if(user){
            if(!user.google_auth){
                return res.status(403).json({ "Lỗi": "Email này đã đăng nhập không dùng Google. Vui lòng đăng nhập lại bằng mật khẩu"})
            }
        }
        else{
            let username = await generateUsername(email)

            user = new User({
                personal_info: { fullname: name, email, username },
                google_auth: true
            })
            await user.save().then((u) => {
                user = u
            })
            .catch(err => {
                return res.status(500).json({ "Lỗi": err.message })
            })
        }

        return res.status(200).json(formatDatatoSend(user))
    })
    .catch(err => {
        return res.status(500).json({ err: "Lỗi khi đăng nhập bằng tài khoản Google. Vui lòng thử lại bằng tài khoản khác" })
    })
})

server.post('/create-blog', (req, res) => {
    return res.json(req.body)
})
server.listen(PORT, () => {
    console.log("listening on port" + PORT);
})