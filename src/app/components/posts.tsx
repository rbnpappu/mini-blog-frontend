"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { setBlogPost } from "../redux/blogSlice";
import { useRouter } from "next/navigation";

interface postsProps {
  posts: any[];
}

const Posts: React.FC<postsProps> = ({ posts }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const choosePost = (post: any) => {
    dispatch(
      setBlogPost({
        title: post.title,
        body: post.body,
      })
    );
    router.push(`/posts/${post.id}`);
  };

  return (
    <div className="flex flex-col gap-[2rem]">
      {posts.map((post, index) => (
        <div
          className="flex flex-col p-[1rem] bg-[#fff] flex-column rounded-[1rem] text-[#201f1f] cursor-pointer"
          key={index}
          onClick={() => choosePost(post)}
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          }}
        >
          <h3 className="text-left text-[1.5rem] font-sans font-[900]">
            {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
          </h3>
          <p className="text-left text-[1rem] font-sans font-[400]">
            {post.body.length > 100
              ? `${post.body.slice(0, 100)}...`
              : post.body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
