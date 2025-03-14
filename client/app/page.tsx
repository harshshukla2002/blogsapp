"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllPosts } from "@/api/posts";
import PostCard from "@/components/PostCard";
import usePostStore from "@/store/PostStore";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";

export default function Home() {
  const { category } = usePostStore((state: any) => state);
  const { mutate, data, isPending, error } = useMutation({
    mutationFn: getAllPosts,
  });

  useEffect(() => {
    if (category) {
      mutate(category);
    } else {
      mutate();
    }
  }, [category]);

  return (
    <main>
      {isPending && (
        <h1 className="text-2xl text-center mt-[12%]">Loading...</h1>
      )}
      {error && (
        <h1 className="text-2xl text-center mt-[12%] text-red-500 font-bold">
          Error occured!!, check console.
        </h1>
      )}

      {!isPending && !error && data && data.posts.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-10 mt-[3%]">
          {data?.posts.map((post: Post) => {
            return <PostCard key={post.id} post={post} />;
          })}
        </div>
      )}
    </main>
  );
}
