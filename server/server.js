import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import User from "./Schema/User.js";
import Blog from "./Schema/Blog.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import cors from "cors";
import admin from "firebase-admin";
import serviceAccountKey from "./sinh-vien-5tot-firebase-adminsdk-355hd-ac4e4aa098.json" assert { type: "json" };
import { getAuth } from "firebase-admin/auth";
import Event from "./Schema/Event.js";

const server = express();
let PORT = 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json());
mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true,
});
server.use(cors());

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.status(401).json({ error: "Không thể truy cập token" });
  }
  jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token không hợp lệ" });
    }

    req.user = user.id;
    next();
  });
};

const formatDatatoSend = (user) => {
  const access_token = jwt.sign(
    { id: user._id },
    process.env.SECRET_ACCESS_KEY
  );
  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

const generateUsername = async (email) => {
  let username = email.split("@")[0];

  let isUsernameNotUnique = await User.exists({
    "personal_info.username": username,
  }).then((result) => result);

  isUsernameNotUnique ? (username += nanoid().substring(0, 5)) : "";

  return username;
};

// const cloudinary = new cloudinary.config({
//     cloud_name: 'dcl6hjfyu',
//     api_key: '877541478169475',
//     api_secret: 'tM2NPUb52qPTofVeXdQA_sQT3fA'
// })
// const generateUploadURL = (blog) => {
//   const date = new Date();
//   const imageName = `${nanoid()}-${date.getTime()}.jpeg`;

//   cloudinary.ge
// };

server.post("/get-upload-url", (req, res) => {
  const { base64 } = req.body;
  try {
    Image.create({ image: base64 });
    res.send({ Status: "ok" });
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
  // generateUploadURL().then(url => res.status(200).json({uploadUrl : url}))
  // .catch(err => {
  //     console.log(err.message);
  //     return res.status(500).json({ "Lỗi": err.message })
  // })
});

//user
server.post("/signup", (req, res) => {
  let { fullname, email, password } = req.body;

  if (fullname.length < 5) {
    return res.status(403).json({ Lỗi: "Họ và tên phải nhiều hơn 5 ký tự" });
  }
  if (!email.length) {
    return res.status(403).json({ Lỗi: "Nhập email" });
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ Lỗi: "Email không đúng" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      Lỗi: "Mật khẩu phải từ 6 đến 20 ký tự bao gồm số, 1 ký tự thường, 1 ký tự hoa",
    });
  }
  bcrypt.hash(password, 10, async (err, hashed_password) => {
    let username = await generateUsername(email);
    let user = new User({
      personal_info: { fullname, email, password: hashed_password, username },
    });

    user
      .save()
      .then((u) => {
        return res.status(200).json(formatDatatoSend(u));
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(500).json({ Lỗi: "Email đã được sử dụng" });
        }
        return res.status(500).json({ Lỗi: err.message });
      });

    console.log(hashed_password);
  });
});

server.post("/signin", (req, res) => {
  let { email, password } = req.body;

  User.findOne({ "personal_info.email": email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ Lỗi: "Email không được tìm thấy" });
      }

      if (!user.google_auth) {
        bcrypt.compare(password, user.personal_info.password, (err, result) => {
          if (err) {
            return res
              .status(403)
              .json({ Lỗi: "Lỗi trong khi đăng nhập vui lòng thử lại" });
          }
          if (!result) {
            return res.status(403).json({ Lỗi: "Mật khẩu không đúng" });
          } else {
            return res.status(200).json(formatDatatoSend(user));
          }
        });
      } else {
        return res.status(403).json({
          Lỗi: "Tài khoản đã được tạo bằng Google. Vui lòng thử đăng nhập bằng Google",
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ Lỗi: err.message });
    });
});

server.post("/google-auth", async (req, res) => {
  let { access_token } = req.body;

  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodecUser) => {
      let { email, name, picture } = decodecUser;

      picture = picture.replace("s96-c", "s384-c");

      let user = await User.findOne({ "personal_info.email": email })
        .select(
          "personal_info.fullname personal_info.username personal_info.profile_img google_auth"
        )
        .then((u) => {
          return u || null;
        })
        .catch((err) => {
          return res.status(500).json({ Lỗi: err.message });
        });

      if (user) {
        if (!user.google_auth) {
          return res.status(403).json({
            Lỗi: "Email này đã đăng nhập không dùng Google. Vui lòng đăng nhập lại bằng mật khẩu",
          });
        }
      } else {
        let username = await generateUsername(email);

        user = new User({
          personal_info: { fullname: name, email, username },
          google_auth: true,
        });
        await user
          .save()
          .then((u) => {
            user = u;
          })
          .catch((err) => {
            return res.status(500).json({ Lỗi: err.message });
          });
      }

      return res.status(200).json(formatDatatoSend(user));
    })
    .catch((err) => {
      return res.status(500).json({
        err: "Lỗi khi đăng nhập bằng tài khoản Google. Vui lòng thử lại bằng tài khoản khác",
      });
    });
});

server.post("/search-users", (req, res) => {

  let { query } = req.body

  User.find({"personal_info.username": new RegExp(query, 'i')})
  .limit(50)
  .select("personal_info.fullname personal_info.username personal_info.profile_img -_id")
  .then(users => {
    return res.status(200).json({ users })
  })
  .catch(err => {
    return res.status(500).json({ error : err.message })
  })
})

server.post("/get-profile", (req, res) => {
  let { username } = req.body

  User.findOne({ "personal_info.username": username })
  .select("-personal_info.password -google_auth -updatedAt -blogs")
  .then(user => {
    return res.status(200).json(user)
  })
  .catch(err => {
    return res.status(500).json({ error: err.message })
  })
})
// blog
server.post("/latest-blogs", (req, res) => {
  let { page } = req.body;

  let maxLimit = 5;

  Blog.find({ draft: false })
    .populate(
      "author",
      "personal_info.profile_img personal_info.username personal_info.fullname -_id"
    )
    .sort({ publishedAt: -1 })
    .select("blog_id title des banner activity tags publishedAt -_id")
    .skip((page - 1) * maxLimit)
    .limit(maxLimit)
    .then((blogs) => {
      return res.status(200).json({ blogs });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.get("/trending-blogs", (req, res) => {
  let maxLimit = 5;
  Blog.find({ draft: false })
    .populate(
      "author",
      "personal_info.fullname personal_info.username personal_info.profile_img -_id"
    )
    .sort({
      "activity.total_read": -1,
      "activity.total_likes": -1,
      "publishedAt": -1,
    })
    .select("blog_id title publishedAt -_id")
    .limit(maxLimit)
    .then((blogs) => {
      return res.status(200).json({ blogs });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/all-latest-blogs-count", (req, res) => {
  Blog.countDocuments({ draft: false })
    .then(count => {
      return res.status(200).json({ totalDocs: count });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/search-blogs", (req, res) => {
  let { tag, query, author, page } = req.body;
  let findQuery;

  if (tag) {
    findQuery = { tags: tag, draft: false };
  } else if (query) {
    findQuery = { draft: false, title: new RegExp(query, "i") };
  } else if(author) {
    findQuery = { author, draft: false }
  }

  let maxLimit = 2;
  Blog.find(findQuery)
    .populate(
      "author",
      "personal_info.fullname personal_info.username personal_info.profile_img -_id"
    )
    .sort({ "publishedAt": -1 })
    .select("blog_id title des banner activity tags publishedAt -_id")
    .skip((page - 1) * maxLimit)
    .limit(maxLimit)
    .then((blogs) => {
      return res.status(200).json({ blogs });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/search-blogs-count", (req, res) => {
  let { tag, author, query } = req.body;

  let findQuery
  if (tag) {
    findQuery = { tags: tag, draft: false };
  } else if (query) {
    findQuery = { draft: false, title: new RegExp(query, "i") };
  }  else if(author) {
    findQuery = { author, draft: false }
  }
  Blog.countDocuments(findQuery)
    .then((count) => {
      return res.status(200).json({ totalDocs: count });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/create-blog", verifyJWT, (req, res) => {
  let authorId = req.user;
  let { title, des, banner, tags, content, draft } = req.body;
  if (!title.length) {
    return res.status(403).json({ error: "Bạn phải cung cấp tiêu đề để đăng" });
  }
  if (!draft) {
    if (!des.length || des.length > 200) {
      return res
        .status(403)
        .json({ error: "Bạn phải cung cấp mô tả dưới 200 ký tự để đăng" });
    }
    if (!banner.length) {
      return res
        .status(403)
        .json({ error: "Bạn phải cung cấp banner để đăng" });
    }
    if (!content.blocks.length) {
      return res
        .status(403)
        .json({ error: "Bạn phải cung cấp nội dung để đăng" });
    }
    if (!tags.length || tags.length > 5) {
      return res
        .status(403)
        .json({ error: "Bạn phải cung cấp thư viện dưới 5 thư viện để đăng" });
    }
  }
  tags = tags.map((tag) => tag.toLowerCase());
  let blog_id =
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();
  let blog = new Blog({
    title,
    des,
    banner,
    content,
    tags,
    author: authorId,
    blog_id,
    draft: Boolean(draft),
  });

  blog
    .save()
    .then((blog) => {
      let incrementVal = draft ? 0 : 1;
      User.findOneAndUpdate(
        { _id: authorId },
        {
          $inc: { "account_info.total_posts": incrementVal },
          $push: { blogs: blog._id },
        }
      )
        .then((user) => {
          return res.status(200).json({ id: blog.blog_id });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ error: "Cập nhật tổng số bài viết không thành công" });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

//sv 5 tot
server.post("/create-event", verifyJWT, (req, res) => {
  let authorId = req.user;
  let { title, des, banner, content } = req.body;
  if (!title.length) {
    return res.status(403).json({ error: "Bạn phải cung cấp tiêu đề để đăng" });
  }
  if (!des.length || des.length > 200) {
    return res
      .status(403)
      .json({ error: "Bạn phải cung cấp mô tả dưới 200 ký tự để đăng" });
  }
  if (!banner.length) {
    return res.status(403).json({ error: "Bạn phải cung cấp banner để đăng" });
  }
  if (!content.blocks.length) {
    return res
      .status(403)
      .json({ error: "Bạn phải cung cấp nội dung để đăng" });
  }
  let event_id =
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();
  let event = new Event({
    title,
    des,
    banner,
    content,
    author: authorId,
    event_id,
  });

  event
    .save()
    .then((event) => {
      User.findOneAndUpdate(
        { _id: authorId },
        {
          $push: { events: event._id },
        }
      )
        .then((user) => {
          return res.status(200).json({ id: event.event_id });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ error: "Cập nhật tổng số bài viết không thành công" });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.listen(PORT, () => {
  console.log("listening on port" + PORT);
});
