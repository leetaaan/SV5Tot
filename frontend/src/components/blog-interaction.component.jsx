import React, { useContext } from "react";
import { BlogContext } from "../pages/blog.page";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { Toaster, toast } from "react-hot-toast";
const BlogInteraction = () => {
  let {
    blog,
    blog: {
      title,
      blog_id,
      activity,
      activity: { total_likes, total_comments },
      author: {
        personal_info: { username: author_username },
      },
    },
    setBlog,
    islikeByUser,
    setLikeByUser,
  } = useContext(BlogContext);

  let {
    userAuth: { username, access_token },
  } = useContext(UserContext);

  const handleLike = () => {
    if(access_token){
        setLikeByUser(preVal => !preVal)
        
        !islikeByUser ? total_likes++ : total_likes--
        setBlog({...blog, activity: {...activity, total_likes}})
    }
    else{
        toast.error("chua login")
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
            className={"w-10 h-10 rounded-full items-center justify-center " + ( islikeByUser ? "bg-red/20 text-red" : "bg-grey/80")}
          >
            <i className={"fi " + ( islikeByUser ? "fi-sr-heart" : "fi-rr-heart")}></i>
          </button>
          <p className="text-xl text-dark-grey">{total_likes}</p>
          <button className="w-10 h-10 rounded-full items-center justify-center bg-grey/80">
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
            ""
          )}
          <Link
            to={`https://www.instagram.com/naat.eel/instagram?text=Read ${title}&url=${location.href}`}
          >
            <i className="fi fi-rr-share-square text-xl hover:text-twitter"></i>
          </Link>
        </div>
      </div>

      <hr className="my-2 border-grey" />
    </>
  );
};

export default BlogInteraction;
