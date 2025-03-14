/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

import Menu from "./components/Menu";
import { deletePost, getSinglePost } from "@/api/posts";
import Image from "next/image";
import useUser from "@/store/UserStore";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import usePostStore from "@/store/PostStore";

const SinglePost = ({ params }: any) => {
  const { user } = useUser((state: any) => state);
  const router = useRouter();
  const { setEditData } = usePostStore((state: any) => state);
  const { mutate, data, isPending, error } = useMutation({
    mutationFn: getSinglePost,
    onError: (error: any) => {
      console.error(
        "Login Failed:",
        error?.response?.data?.message || "error get single post"
      );
    },
  });

  const deleteMutate = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      toast.success(data?.message);
      router.push("/");
    },
    onError: (error: any) => {
      console.error(
        "Login Failed:",
        error?.response?.data?.message || "error get single post"
      );
    },
  });

  const getPostWithId = async () => {
    const { id } = await params;
    mutate(id);
  };

  useEffect(() => {
    getPostWithId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div className="flex gap-10 mt-8">
      <div className="flex-5">
        {isPending && (
          <h1 className="text-xl text-center mt-[10%]">Loading...</h1>
        )}
        {error && (
          <h1 className="text-2xl text-center mt-[10%] font-bold text-red-500">
            error occurred...!! check console.
          </h1>
        )}
        {!isPending && !error && data && (
          <div className="flex flex-col gap-5">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/images/${data?.post.image}`}
              alt={data?.post.title}
              width={300}
              height={300}
              className="rounded object-fill"
            />
            {/* user info */}
            <div className="my-5 flex flex-row gap-5 items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/images/${data?.post?.userImg}`}
                alt={data?.post.username}
                width={50}
                height={50}
                className="object-fill rounded-full"
              />
              <div>
                <h1 className="text-base font-bold capitalize">
                  {data?.post?.username}
                </h1>
                <h1 className="text-base">
                  {moment(data?.post?.date).startOf("day").fromNow()}
                </h1>
              </div>
              {user?.username === data?.post?.username && (
                <div className="flex gap-2 items-center ml-10">
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      const sendObj = {
                        id: data?.post?.id,
                        title: data?.post?.title,
                        desc: data?.post?.desc,
                        image: data?.post?.image,
                        category: data?.post?.category,
                      };
                      setEditData(sendObj);
                      router.push("/write?edit=2");
                    }}
                  >
                    <AiOutlineEdit />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() => deleteMutate.mutate(data?.post?.id)}
                  >
                    <AiFillDelete />
                  </Button>
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold">{data?.post?.title}</h1>
            <p className="text-xl text-gray-500">
              {data?.post?.desc.replace(/(<([^>]+)>)/gi, "")}
            </p>
            <p className="text-lg text-left">
              <b>Category: </b>
              {data?.post?.category}
            </p>
          </div>
        )}
      </div>
      <div className="flex-2">
        <Menu
          category={data?.post?.category as string}
          postId={data?.post?.id}
        />
      </div>
    </div>
  );
};

export default SinglePost;
