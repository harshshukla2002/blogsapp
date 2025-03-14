/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { getAllPosts } from "@/api/posts";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Menu = ({ category, postId }: { category: string; postId: number }) => {
  const { mutate, data, isPending, error } = useMutation({
    mutationFn: getAllPosts,
  });

  useEffect(() => {
    if (category) mutate(category);
  }, [category]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl">Similar Posts</h1>
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
            if (post.id !== postId) {
              return (
                <div key={post.id} className="flex flex-col gap-5">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/images/${post.image}`}
                    alt={post.title}
                    width={100}
                    height={100}
                    className="rounded object-fill"
                  />
                  {/* user info */}
                  <h1 className="text-base font-bold">{post?.title}</h1>
                  <p className="text-sm text-gray-500">
                    {post?.desc.replace(/(<([^>]+)>)/gi, "")}
                  </p>
                  <Link href={`/post/${post.id}`}>
                    <Button variant={"outline"} className="">
                      Read More
                    </Button>
                  </Link>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Menu;
