import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InPageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import BlogPostCard from "../components/blog-post.component";
import NodataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import axios from "axios";
import { filterPaginationData } from "../common/filter-pagination-data";
import UserCard from "../components/usercard.component";

const SearchPage = () => {
  let { query } = useParams();

  let [blogs, setBlog] = useState(null);
  let [users, setUsers] = useState(null);

  const searchBlogs = async ({ page = 1, create_new_arr = false }) => {
    // axios
    //   .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
    //     query,
    //     page,
    //     tag: query,
    //     category: query
    //   })
    //   .then(async ({ data }) => {
    //     let formatData = await filterPaginationData({
    //       state: blogs,
    //       data: data.blogs,
    //       page,
    //       countRoute: "/search-blogs-count",
    //       data_to_send: { query },
    //       create_new_arr,
    //     });
    //     setBlog(formatData);
    //     console.log(formatData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/search-blogs`,
        {
          query,
          page,
          tag: query,
          category: query,
        }
      );
  
      const formatData = await filterPaginationData({
        state: blogs,
        data: response.data.blogs,
        page,
        countRoute: "/search-blogs-count",
        data_to_send: { query },
        create_new_arr,
      });
  
      setBlog(formatData);
      console.log(formatData);
    } catch (error) {
      console.error(error);
      // Display a user-friendly error message
    }
  };

  const fetchUsers = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-users", { query })
      .then(({ data: { users } }) => {
        setUsers(users);
      });
  };

  useEffect(() => {
    resetState();
    searchBlogs({ page: 1, create_new_arr: true });
    fetchUsers();
  }, [query]);

  const resetState = () => {
    setBlog(null);
    setUsers(null);
  };

  const UserCardWrapper = () => {
    return (
      <>
        {
          users === null ? <Loader />
         : users.length ? 
          users.map((user, i) => {
            return (
              <AnimationWrapper
                key={i}
                transition={{ duration: 1, delay: i * 0.1 }}
              >
                <UserCard user={user} />
              </AnimationWrapper>
            );
          })
         : 
          <NodataMessage message="Không tìm thấy tài khoản nào" />
        }
      </>
    );
  };

  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={[`Kết quả tìm kiếm cho "${query}"`, "Tài khoản liên quan"]}
          defaultHidden={["Tài khoản liên quan"]}
        >
          <>
            {blogs == null ? (
              <Loader />
            ) : blogs.results.length ? (
              blogs.results.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.1 }}
                    key={i}
                  >
                    <BlogPostCard
                      content={blog}
                      author={blog.author.personal_info}
                    />
                  </AnimationWrapper>
                );
              })
            ) : (
              <NodataMessage message="Chưa có bài viết nào" />
            )}
            <LoadMoreDataBtn state={blogs} fetchData={searchBlogs} />
          </>

          <UserCardWrapper />
        </InPageNavigation>
      </div>
      <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
        <h1 className="mb-8 font-medium text-xl">Tài khoản liên quan đến tìm kiếm <i className="fi fi-rr-user mt-1"></i></h1>
          <UserCardWrapper />
      </div>
    </section>
  );
};

export default SearchPage;
