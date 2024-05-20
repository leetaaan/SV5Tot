import React, { useContext, useEffect } from "react";
import { BlogContext } from "../pages/blog.page";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const BlogInteraction = () => {
  let {
    blog,
    blog: {
      _id,
      title,
      blog_id,
      activity,
      activity: { total_likes, total_comments, total_reports },
      author: {
        personal_info: { username: author_username },
      },
    },
    setBlog,
    islikedByUser,
    setLikedByUser,
    isreportedByUser,
    setReportedByUser,
    setCommentsWrapper,
  } = useContext(BlogContext);

  let {
    userAuth: { username, access_token },
  } = useContext(UserContext);

  useEffect(() => {
    if (access_token) {
      axios
        .post(
          import.meta.env.VITE_SERVER_DOMAIN + "/isliked-by-user",
          { _id },
          {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            },
          }
        )
        .then(({ data: { result } }) => {
          setLikedByUser(Boolean(result));
        })
        .catch((err) => {
          console.log(err);
        });

        axios
        .post(
          import.meta.env.VITE_SERVER_DOMAIN + "/isreported-by-user",
          { _id },
          {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            },
          }
        )
        .then(({ data: { result } }) => {
          setReportedByUser(Boolean(result));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleLike = () => {
    if (access_token) {
      setLikedByUser((preVal) => !preVal);

      !islikedByUser ? total_likes++ : total_likes--;
      setBlog({ ...blog, activity: { ...activity, total_likes } });

      axios
        .post(
          import.meta.env.VITE_SERVER_DOMAIN + "/like-blog",
          { _id, islikedByUser },
          {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            },
          }
        )
        .then(({ data }) => {
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Chưa đăng nhập");
    }
  };

  const handleReport = () => {
    if (access_token) {
      setReportedByUser((preVal) => !preVal);

      !isreportedByUser ? total_reports++ : total_reports--;
      setBlog({ ...blog, activity: { ...activity, total_reports } });

      axios
        .post(
          import.meta.env.VITE_SERVER_DOMAIN + "/report-blog",
          { _id, isreportedByUser },
          {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            },
          }
        )
        .then(({ data }) => {
          toast.success("Báo cáo bài viết vi phạm tiêu chuẩn cộng đồng thành công")
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Chưa đăng nhập");
    }
  };

  return (
    <>
      <Toaster />
      <hr className="my-2 border-grey" />
      <div className="flex gap-6 justify-between">
        <div className="flex gap-3 items-center">
          <button
            onClick={handleLike}
            className={
              "w-10 h-10 rounded-full items-center justify-center " +
              (islikedByUser ? "bg-red/20 text-red" : "bg-grey/80")
            }
          >
            <i
              className={
                "fi " + (islikedByUser ? "fi-sr-heart" : "fi-rr-heart")
              }
            ></i>
          </button>
          <p className="text-xl text-dark-grey">{total_likes}</p>
          <button
            onClick={() => setCommentsWrapper(preVal => !preVal)}
            className="w-10 h-10 rounded-full items-center justify-center bg-grey/80"
          >
            <i className="fi fi-rr-comment-dots"></i>
          </button>
          <p className="text-xl text-dark-grey">{total_comments}</p>
        </div>

        <div className="flex gap-6 items-center">
          {username === author_username ? (
            <Link
              to={`/editor/${blog_id}`}
              className="underline hover:text-purple"
            >
              Chỉnh sửa
            </Link>
          ) : (
            <>
          <button onClick={handleReport}>
            <i className="underline hover:text-red">Báo cáo</i>
          </button>
          <Link to={`/community-standards`}><i className="fi fi-rr-info hover:text-dark-grey"></i></Link>
            </>
          )}
        </div>
      </div>

      <hr className="my-2 border-grey" />
    </>
  );
};

export default BlogInteraction;
