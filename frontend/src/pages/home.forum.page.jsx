import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import axios from "axios";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBllogPost from "../components/nobanner-blog-post.component";
import { activeTabRef } from "../components/inpage-navigation.component";
import NodataMessage from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";

const HomeForumPage = () => {

  let [blogs, setBlogs] = useState(null);
  let [trendingBlogs, setTrendingBlogs] = useState(null);
  let [pageState, setPageState] = useState("Bài viết mới nhất");

  let categories = [ "tag 1", "test", "1", "2", "3", "tan", "test 6", "test 7" ]

  const fetchLatestBlogs = ( {page = 1} ) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page })
      .then(async ({ data }) => {
        let formatData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/all-latest-blogs-count",
        })
        setBlogs(formatData)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBlogsByCategory = ({ page = 1 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag: pageState, page })
      .then( async ({ data }) => {
        let formatData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { tag: pageState }
        })
        setBlogs(formatData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const fetchTrendingBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then(({ data }) => {
        setTrendingBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadBlogByCategory = (e) => {
    let category = e.target.innerText.toLowerCase()

    setBlogs(null)
    if(pageState === category){
      setPageState("Bài viết mới nhất")
      return
    }
    setPageState(category)
  }

  useEffect(() => {
    activeTabRef.current.click();


    if(pageState === "Bài viết mới nhất"){
      fetchLatestBlogs({ page: 1 });
    } else {
      fetchBlogsByCategory({ page: 1 })
    }
    if(!trendingBlogs){
      fetchTrendingBlogs()
    }
  }, [pageState]);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <InPageNavigation
            routes={[pageState, "trending blogs"]}
            defaultHidden={["trending blogs"]}
          >
            <>
              {blogs === null ? (
                <Loader />
              ) : (
                blogs.results.length ?
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
                  : <NodataMessage message=" Chưa có bài viết nào" />
              )}
              <LoadMoreDataBtn state={blogs} fetchData={pageState === "Bài viết mới nhất" ? fetchLatestBlogs : fetchBlogsByCategory}/>
            </>
            {trendingBlogs === null ? (
                <Loader />
              ) : (
                trendingBlogs.length ?
                  trendingBlogs.map((blog, i) => {
                    return (
                      <AnimationWrapper
                        transition={{ duration: 1, delay: i * 0.1 }}
                        key={i}
                      >
                        <MinimalBllogPost blog={blog} index={i}/>
                      </AnimationWrapper>
                    );
                  })
                  : <NodataMessage message=" Chưa có bài viết xu hướng nào" />
              )}
          </InPageNavigation>
          </div>
          <div className="pl-8 min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pt-3 max-md:hidden">
            <div className="flex flex-col gap-10">
              <div>
                <h1 className="text-xl font-medium mb-8">Bài viết thú vị</h1>
                <div className="flex gap-3 flex-wrap">
                  {
                    categories.map((category, i) => {
                      return <button onClick={loadBlogByCategory} className={"tag " + (pageState === category ? " bg-black text-white ": " ")} key={i}>
                        {category}
                      </button>
                    })
                  }
                </div>
              </div>
              <div>
                <h1 className="text-xl font-medium mb-8">Xu hướng <i className="fi fi-rr-arrow-trend-up"></i></h1>
                {trendingBlogs === null ? (
                    <Loader />
                  ) : (
                    trendingBlogs.length ?
                    trendingBlogs.map((blog, i) => {
                      return (
                        <AnimationWrapper
                          transition={{ duration: 1, delay: i * 0.1 }}
                          key={i}
                        >
                          <MinimalBllogPost blog={blog} index={i}/>
                        </AnimationWrapper>
                      );
                    })
                    : <NodataMessage message=" Chưa có bài viết xu hướng nào" />
                  )}
              </div>
            </div>
          </div>
      </section>
    </AnimationWrapper>
  );
};

export default HomeForumPage;
