import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import cors from "cors";
import admin from "firebase-admin";
import serviceAccountKey from "./sinh-vien-5tot-firebase-adminsdk-355hd-ac4e4aa098.json" assert { type: "json" };
import { getAuth } from "firebase-admin/auth";
import nodemailer from "nodemailer"
import User from "./Schema/User.js";
import Blog from "./Schema/Blog.js";
import Notification from "./Schema/Notification.js";
import Comment from "./Schema/Comment.js";
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
    clas: user.personal_info.clas,
    faculty: user.personal_info.faculty,
    dateOfBirth: user.personal_info.dateOfBirth,
    role: user.personal_info.role,
    gender: user.personal_info.gender,
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

//user
server.post("/signup", (req, res) => {
  let { fullname, email, password, clas, faculty, dateOfBirth, gender, role } =
    req.body;

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
      Lỗi: "Mật khẩu phải từ 6 đến 20 ký tự bao gồm ít nhất 1 số, 1 ký tự thường, 1 ký tự hoa",
    });
  }
  bcrypt.hash(password, 10, async (err, hashed_password) => {
    let username = await generateUsername(email);
    let user = new User({
      personal_info: {
        fullname,
        email,
        password: hashed_password,
        username,
        clas,
        gender,
        faculty,
        dateOfBirth,
        role,
      },
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
          personal_info: {
            fullname: name,
            email,
            username,
            clas,
            faculty,
            dateOfBirth,
          },
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
  let { query } = req.body;

  User.find({ "personal_info.username": new RegExp(query, "i") })
    .limit(50)
    .select(
      "personal_info.fullname personal_info.username personal_info.profile_img personal_info.class personal_info.faculty -_id"
    )
    .then((users) => {
      return res.status(200).json({ users });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/get-profile", (req, res) => {
  let { username } = req.body;

  User.findOne({ "personal_info.username": username })
    .select("-personal_info.password -google_auth -updatedAt -blogs")
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/change-password", verifyJWT, (req, res) => {
  let { currentPassword, newPassword } = req.body;

  if (
    !passwordRegex.test(currentPassword) ||
    !passwordRegex.test(newPassword)
  ) {
    return res.status(403).json({
      error:
        "Mật khẩu phải từ 6 đến 20 ký tự bao gồm ít nhất 1 số, 1 ký tự thường, 1 ký tự hoa",
    });
  }

  User.findOne({ _id: req.user })
    .then((user) => {
      if (user.google_auth) {
        return res.status(403).json({
          error: "Bạn không thể đổi mật khẩu vì bạn đăng nhập bằng Google",
        });
      }

      bcrypt.compare(
        currentPassword,
        user.personal_info.password,
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Đã có lỗi xảy ra, vui lòng thử lại" });
          }

          if (!result) {
            return res.status(500).json({ error: "Mật khẩu cũ không đúng" });
          }

          bcrypt.hash(newPassword, 10, (err, hashed_password) => {
            User.findOneAndUpdate(
              { _id: req.user },
              { "personal_info.password": hashed_password }
            )
              .then((u) => {
                return res.status(200).json({ status: "Đã đổi mật khẩu" });
              })
              .catch((err) => {
                return res.status(500).json({
                  error:
                    "Đã có lỗi xảy ra khi lưu mật khẩu mới, vui lòng thử lại",
                });
              });
          });
        }
      );
    })
    .catch((err) => {
      return res.status(500).json({ error: "Không tìm thấy người dùng" });
    });
});

server.post("/update-profile-img", verifyJWT, (req, res) => {
  let { url } = req.body;
  User.findOneAndUpdate({ _id: req.user }, { "personal_info.profile_img": url })
    .then(() => {
      return res.status(200).json({ profile_img: url });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/update-profile", verifyJWT, (req, res) => {
  let { username, bio, clas, faculty, dateOfBirth, gender, social_links } = req.body;
  let bioLimit = 150;
  if (username.length < 3) {
    return res
      .status(403)
      .json({ error: "Tên tài khoản phải ít nhất 3 ký tự" });
  }
  if (bio.length > bioLimit) {
    return res
      .status(403)
      .json({ error: `Mô tả không thể nhiều hơn ${bioLimit} ký tự` });
  }

  let socialLinksArr = Object.keys(social_links);
  try {
    for (let i = 0; i < socialLinksArr.length; i++) {
      if (social_links[socialLinksArr[i]].length) {
        let hostname = new URL(social_links[socialLinksArr[i]]).hostname;

        if (
          !hostname.includes(`${socialLinksArr[i]}.com`) &&
          socialLinksArr[i] != "website"
        ) {
          return res.status(403).json({
            error: `${socialLinksArr[i]} không đúng. Vui lòng thử lại`,
          });
        }
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: "Bạn phải cung cấp liên kết với http(s)",
    });
  }

  let updateObj = {
    "personal_info.username": username,
    "personal_info.bio": bio,
    "personal_info.clas": clas,
    "personal_info.faculty": faculty,
    "personal_info.dateOfBirth": dateOfBirth,
    "personal_info.gender": gender,
    social_links,
  };
  User.findOneAndUpdate({ _id: req.user }, updateObj, {
    runValidators: true,
  })
    .then(() => {
      return res.status(200).json({ username });
    })
    .catch((err) => {
      if (err.code == 11000) {
        return res
          .status(409)
          .json({ error: "Tên tài khoản đã được người khác sử dụng" });
      }
      return res.status(500).json({ error: err.message });
    });
});

server.post("/forgot-password" , async (req, res) => {
  let { email } = req.body
    User.findOne({"personal_info.email": email })
  .then((user) => {
    if (!user) {
      return res.status(404).json({ error: "Tài khoản không tồn tại" });
    }
    
    const token = jwt.sign({id: user._id}, process.env.SECRET_ACCESS_KEY, {expiresIn: '5m'})
  
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'letan085@gmail.com',
        pass: 'dbxf gjih uyyh kccz'
      }
    });
    
    const encodedToken = encodeURIComponent(token).replace(/\./g, "")
    var mailOptions = {
      from: 'letan085@gmail.com',
      to: email,
      subject: 'Đặt lại mật khẩu',
      text: `http://localhost:5173/reset-password/${encodedToken}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  })
  .catch((err) => {
    return res.status(500).json({ error: err.message });
  });
})

server.post("/reset-password:token", async (req, res) => {
  const { token } = req.params.token;
  const { password } = req.body

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_ACCESS_KEY)
    const id = decoded.id
    const hashPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate({_id: id}, { "personal_info.password": hashPassword })
    return res.status(200).json({ status: "Đã đổi mật khẩu" });
  } catch(err) {
    return res.status(500).json({
      error:
        "Đã có lỗi xảy ra khi lưu mật khẩu mới, vui lòng thử lại",
    });
  }
});
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
      publishedAt: -1,
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
    .then((count) => {
      return res.status(200).json({ totalDocs: count });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/search-blogs", (req, res) => {
  let { tag, query, author, page, limit, eliminate_blog } = req.body;
  let findQuery;

  if (tag) {
    findQuery = { tags: tag, draft: false, blog_id: { $ne: eliminate_blog } };
  }
  if (query) {
    if (findQuery) {
      findQuery = {
        $or: [
          { categories: new RegExp(query, "i") },
          findQuery,
        ],
        draft: false,
      };
    } else {
      findQuery = { categories: new RegExp(query, "i"), draft: false };
    }
  }
  if (author) {
    findQuery = { author, draft: false };
  }

  let maxLimit = limit ? limit : 2;
  Blog.find(findQuery)
    .populate(
      "author",
      "personal_info.fullname personal_info.username personal_info.profile_img -_id"
    )
    .sort({ publishedAt: -1 })
    .select("blog_id title des banner activity tags categories publishedAt -_id")
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

  let findQuery;
  if (tag) {
    findQuery = { tags: tag, draft: false };
  } 
  if (query) {
    if (findQuery) {
      findQuery = {
        $or: [
          { categories: new RegExp(query, "i") },
          findQuery,
        ],
        draft: false,
      };
    } else {
      findQuery = { categories: new RegExp(query, "i"), draft: false };
    }
  }
  if (author) {
    findQuery = { author, draft: false };
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
  let { title, des, banner, tags, content, draft, id, categories } = req.body;
  if (!title.length) {
    return res.status(403).json({ error: "Bạn phải cung cấp tiêu đề để đăng" });
  }
  if (!draft) {
    if (!des.length || des.length > 200) {
      return res
        .status(403)
        .json({ error: "Bạn phải cung cấp mô tả dưới 200 ký tự để đăng" });
    }
    if (!categories.length) {
      return res
        .status(403)
        .json({ error: "Bạn phải cung cấp thư viện để đăng" });
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
    id ||
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();

  if (id) {
    Blog.findOneAndUpdate(
      { blog_id },
      { title, des, banner, content, categories, tags, draft: draft ? draft : false }
    )
      .then(() => {
        return res.status(200).json({ id: blog_id });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  } else {
    let blog = new Blog({
      title,
      des,
      banner,
      content,
      tags,
      author: authorId,
      categories,
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
  }
});

server.post("/get-blog", (req, res) => {
  let { blog_id, draft, mode } = req.body;

  let incrementVal = mode != "edit" ? 1 : 0;

  Blog.findOneAndUpdate(
    { blog_id },
    { $inc: { "activity.total_reads": incrementVal } }
  )
    .populate(
      "author",
      "personal_info.fullname personal_info.username personal_info.profile_img"
    )
    .select("title des banner content activity tags categories publishedAt blog_id ")
    .then((blog) => {
      User.findOneAndUpdate(
        { "personal_info.username": blog.author.personal_info.username },
        { $inc: { "account_info.total_reads": incrementVal } }
      ).catch((err) => {
        return res.status(500).json({ error: err.message });
      });
      if (blog.draft && !draft) {
        return res.status(500).json({ error: "loi khong tim thay dia chi" });
      }

      return res.status(200).json({ blog });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/like-blog", verifyJWT, (req, res) => {
  let user_id = req.user;

  let { _id, islikedByUser } = req.body;

  let incrementVal = !islikedByUser ? 1 : -1;

  Blog.findOneAndUpdate(
    { _id },
    { $inc: { "activity.total_likes": incrementVal } }
  ).then((blog) => {
    if (!islikedByUser) {
      let like = new Notification({
        type: "like",
        blog: _id,
        notification_for: blog.author,
        user: user_id,
      });

      like.save().then((notification) => {
        return res.status(200).json({ like_by_user: true });
      });
    } else {
      Notification.findOneAndDelete({ user: user_id, blog: _id, type: "like" })
        .then((data) => {
          return res.status(200).json({ like_by_user: false });
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
    }
  });
});

server.post("/isliked-by-user", verifyJWT, (req, res) => {
  let user_id = req.user;

  let { _id } = req.body;

  Notification.exists({ user: user_id, type: "like", blog: _id })
    .then((result) => {
      return res.status(200).json({ result });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/report-blog", verifyJWT, (req, res) => {
  let user_id = req.user;

  let { _id, isreportedByUser } = req.body;

  let incrementVal = !isreportedByUser ? 1 : -1;

  Blog.findOneAndUpdate(
    { _id },
    { $inc: { "activity.total_reports": incrementVal } }
  ).then((blog) => {
    if (!isreportedByUser) {
      let like = new Notification({
        type: "report",
        blog: _id,
        notification_for: blog.author,
        user: user_id,
      });

      like.save().then((notification) => {
        return res.status(200).json({ report_by_user: true });
      });
    } else {
      Notification.findOneAndDelete({ user: user_id, blog: _id, type: "report" })
        .then((data) => {
          return res.status(200).json({ report_by_user: false });
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
    }
  });
});

server.post("/isreported-by-user", verifyJWT, (req, res) => {
  let user_id = req.user;

  let { _id } = req.body;

  Notification.exists({ user: user_id, type: "report", blog: _id })
    .then((result) => {
      return res.status(200).json({ result });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/add-comment", verifyJWT, (req, res) => {
  let user_id = req.user;

  let { _id, comment, blog_author, replying_to, notification_id } = req.body;

  if (!comment.length) {
    return res.status(403).json({ error: "Viết nội dung để bình luận" });
  }

  let commentObj = {
    blog_id: _id,
    blog_author,
    comment,
    commented_by: user_id,
  };

  if (replying_to) {
    commentObj.parent = replying_to;
    commentObj.isReply = true;
  }

  new Comment(commentObj).save().then(async (commentFile) => {
    let { comment, commentedAt, children } = commentFile;

    Blog.findOneAndUpdate(
      { _id },
      {
        $push: { comments: commentFile._id },
        $inc: {
          "activity.total_comments": 1,
          "activity.total_parent_comments": replying_to ? 0 : 1,
        },
      }
    ).then((blog) => {
      console.log("Đã tạo bình luận mới");
    });

    let notificationObj = {
      type: replying_to ? "reply" : "comment",
      blog: _id,
      notification_for: blog_author,
      user: user_id,
      comment: commentFile._id,
    };

    if (replying_to) {
      notificationObj.replied_on_comment = replying_to;

      await Comment.findOneAndUpdate(
        { _id: replying_to },
        { $push: { children: commentFile._id } }
      ).then((replyingToCommentDoc) => {
        notificationObj.notification_for = replyingToCommentDoc.commented_by;

        if (notification_id) {
          Notification.findOneAndUpdate(
            { _id: notification_id },
            { reply: commentFile._id }
          ).then((notification) => console.log("Đã cập nhật thông báo"));
        }
      });
    }

    new Notification(notificationObj)
      .save()
      .then((notification) => console.log("Đã tạo thông báo mới"));

    return res.status(200).json({
      comment,
      commentedAt,
      _id: commentFile._id,
      user_id,
      children,
    });
  });
});

server.post("/get-replies", (req, res) => {
  let { _id, skip } = req.body;

  let maxLimit = 5;

  Comment.findOne({ _id })
    .populate({
      path: "children",
      options: {
        limit: maxLimit,
        skip: skip,
        sort: { commentedAt: -1 },
      },
      populate: {
        path: "commented_by",
        select:
          "personal_info.fullname personal_info.username personal_info.profile_img",
      },
      select: "-blog_id -updatedAt",
    })
    .select("children")
    .then((doc) => {
      return res.status(200).json({ replies: doc.children });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

const deleteComments = (_id) => {
  Comment.findOneAndDelete({ _id })
    .then((comment) => {
      if (comment.parent) {
        Comment.findOneAndUpdate(
          { _id: comment.parent },
          { $pull: { children: _id } }
        )
          .then((data) => console.log("Xóa bình luận"))
          .catch((err) => console.log(err));
      }
      Notification.findOneAndDelete({ comment: _id }).then((notification) =>
        console.log("Thông báo về bình luận đã được xóa")
      );
      Notification.findOneAndUpdate(
        { reply: _id },
        { $unset: { reply: 1 } }
      ).then((notification) => console.log("Thông báo về trả lời đã được xóa"));

      Blog.findOneAndUpdate(
        { _id: comment.blog_id },
        {
          $pull: { comments: _id },
          $inc: { "activity.total_comments": -1 },
          "activity.total_parent_comments": comment.parent ? 0 : -1,
        }
      ).then((blog) => {
        if (comment.children.length) {
          comment.children.map((replies) => {
            deleteComments(replies);
          });
        }
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
server.post("/delete-comment", verifyJWT, (req, res) => {
  let user_id = req.user;

  let { _id } = req.body;

  Comment.findOne({ _id }).then((comment) => {
    if (user_id == comment.commented_by || user_id == comment.blog_author) {
      deleteComments(_id);
      return res.status(200).json({ status: "Xong" });
    } else {
      return res.status(403).json({ error: "Bạn không thể xóa bình luận này" });
    }
  });
});

server.post("/get-blog-comments", (req, res) => {
  let { blog_id, skip } = req.body;

  let maxLimit = 5;

  Comment.find({ blog_id, isReply: false })
    .populate(
      "commented_by",
      "personal_info.username personal_info.fullname personal_info.profile_img"
    )
    .skip(skip)
    .limit(maxLimit)
    .sort({
      commentedAt: -1,
    })
    .then((comments) => {
      return res.status(200).json(comments);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

//notification
server.get("/new-notification", verifyJWT, (req, res) => {
  let user_id = req.user;
  Notification.exists({
    notification_for: user_id,
    seen: false,
    user: { $ne: user_id },
  })
    .then((result) => {
      if (result) {
        return res.status(200).json({ new_notification_available: true });
      } else {
        return res.status(200).json({ new_notification_available: false });
      }
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    });
});

server.post("/notifications", verifyJWT, (req, res) => {
  let user_id = req.user;

  let { page, filter, deletedDocCount } = req.body;

  let maxLimit = 10;

  let findQuery = { notification_for: user_id, user: { $ne: user_id } };
  let skipDocs = (page - 1) * maxLimit;

  if (filter != "Tất cả") {
    findQuery.type = filter;
  }
  if (deletedDocCount) {
    skipDocs -= deletedDocCount;
  }

  Notification.find(findQuery)
    .skip(skipDocs)
    .limit(maxLimit)
    .populate("blog", "title blog_id")
    .populate(
      "user",
      "personal_info.fullname personal_info.username personal_info.profile_img"
    )
    .populate("comment", "comment")
    .populate("replied_on_comment", "comment")
    .populate("reply", "comment")
    .sort({ createdAt: -1 })
    .select("createdAt type seen reply")
    .then((notifications) => {
      Notification.updateMany(findQuery, { seen: true })
      .skip(skipDocs)
      .limit(maxLimit)
      .then(() => console.log('Thông báo đã được xem'))

      return res.status(200).json({ notifications });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/all-notifications-count", verifyJWT, (req, res) => {
  let user_id = req.user;
  let { filter } = req.body;

  let findQuery = { notification_for: user_id, user: { $ne: user_id } };

  if (filter != "Tất cả") {
    findQuery.type = filter;
  }

  Notification.countDocuments(findQuery)
    .then((count) => {
      return res.status(200).json({ totalDocs: count });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

//manager blog
server.post("/user-written-blogs", verifyJWT, (req, res) => {
  let user_id = req.user;

  let { page, draft, query, deletedDocCount } = req.body;

  let maxLimit = 5;
  let skipDocs = (page - 1) * maxLimit;

  if (deletedDocCount) {
    skipDocs -= deletedDocCount;
  }

  Blog.find({ author: user_id, draft, title: new RegExp(query, "i") })
    .skip(skipDocs)
    .limit(maxLimit)
    .sort({ publishedAt: -1 })
    .select(" title banner publishedAt blog_id activity des draft -_id ")
    .then((blogs) => {
      return res.status(200).json({ blogs });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/user-written-blogs-count", verifyJWT, (req, res) => {
  let user_id = req.user;

  let { draft, query } = req.body;

  Blog.countDocuments({ author: user_id, draft, title: new RegExp(query, "i") })
    .then((count) => {
      return res.status(200).json({ totalDocs: count });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/delete-blog", verifyJWT, (req, res) => {
  let user_id = req.user;

  let { blog_id } = req.body;

  Blog.findOneAndDelete({ blog_id })
    .then(blog => {
      Notification.deleteMany({ blog: blog._id })
      .then(data => console.log("Đã xóa thông báo"))

      Comment.deleteMany({ blog: blog._id })
      .then(data => console.log("Đã xóa bình luận"))

      User.findOneAndUpdate({ _id: user_id }, { $pull: { blog: blog._id }, $inc: { "account_info.total_posts": blog.draft ? 0 : -1 }})
      .then(user => console.log("Đã xóa bài viết"))

      return res.status(200).json({ status: "Xong" });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

//sv 5 tot
// server.post("/create-event", verifyJWT, (req, res) => {
//   let authorId = req.user;
//   let { title, tcc } = req.body;
//   if (!title.length) {
//     return res.status(403).json({ error: "Bạn phải cung cấp tiêu đề để đăng" });
//   }
//   if (!tcc.length) {
//     return res.status(403).json({ error: "Bạn phải cung cấp banner để đăng" });
//   }
//   let event_id =
//     title
//       .replace(/[^a-zA-Z0-9]/g, " ")
//       .replace(/\s+/g, "-")
//       .trim() + nanoid();
//   let event = new Event({
//     title,
//     tcc,
//     author: authorId,
//     event_id,
//   });

//   event.save().then((event) => {
//       User.findOneAndUpdate(
//         { _id: authorId },
//         {
//           $push: { events: event._id },
//         }
//       )
//         .then((user) => {
//           return res.status(200).json({ id: event.event_id });
//         })
//         .catch((err) => {
//           return res
//             .status(500)
//             .json({ error: "Cập nhật tổng số bài viết không thành công" });
//         });
//     })
//     .catch((err) => {
//       return res.status(500).json({ error: err.message });
//     });
// });

server.post("/create-event", verifyJWT, (req, res) => {
  let authorId = req.user;
  let { title, tcc } = req.body;
  if (!title.length) {
    return res.status(403).json({ error: "Bạn phải cung cấp tiêu đề để đăng" });
  }
  if (!tcc) {
    return res.status(403).json({ error: "Bạn phải cung cấp banner để đăng" });
  }
  let event_id =
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();

  // Create a new instance of the Event model
  const newEvent = new Event({
    title,
    tcc,
    author: authorId,
    event_id,
  });

  newEvent
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
