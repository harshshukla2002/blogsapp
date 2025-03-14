/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createPost, updatePost } from "@/api/posts";
import usePostStore from "@/store/PostStore";

type FormData = {
  title: string;
  desc: string;
  category: string;
  image: any;
};

const intialState = {
  title: "",
  desc: "",
  category: "",
  image: "",
};

const Write = () => {
  const { editData, setEditData } = usePostStore((state: any) => state);
  const [formData, setFormData] = useState<FormData>(editData || intialState);
  const categorys = [
    "Art",
    "Science",
    "Technology",
    "Cinema",
    "Design",
    "Food",
  ];
  const router = useRouter();
  const isEdit = window?.location?.href?.split("?")[1]?.split("=")[1];

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (data: any) => {
      console.log("register Successful:", data);
      setFormData(intialState);
      router.push("/");
      toast.success(data.message);
    },
    onError: (error: any) => {
      console.error(
        "Login Failed:",
        error?.response?.data?.message || "error on register"
      );
      toast.error(error?.response?.data?.message || "error on register");
    },
  });

  const editMutate = useMutation({
    mutationFn: updatePost,
    onSuccess: (data: any) => {
      setFormData(intialState);
      setEditData(null);
      router.push("/");
      toast.success(data.message);
    },
    onError: (error: any) => {
      console.error(
        "Login Failed:",
        error?.response?.data?.message || "error on register"
      );
      toast.error(error?.response?.data?.message || "error on register");
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registerObj = new FormData();
    registerObj.append("title", formData.title);
    registerObj.append("desc", formData.desc);
    registerObj.append("category", formData.category);
    registerObj.append("image", formData.image);
    if (isEdit && isEdit === "2")
      editMutate.mutate({ body: registerObj, id: editData.id });
    else mutate(registerObj);
  };

  return (
    <div className="mt-[20px] flex gap-[20px]">
      <form className="flex-[5]" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="enter title"
          value={formData.title}
          name="title"
          onChange={handleChange}
          required
        />
        <div className="my-5 h-[300px] overflow-hidden">
          <ReactQuill
            style={{ border: "none", height: "80%" }}
            placeholder="enter description..."
            theme="snow"
            value={formData.desc}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                desc: value,
              }))
            }
          />
        </div>
        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Loading..." : "Create Post"}
        </Button>
      </form>
      <div className="flex-[2] flex flex-col gap-1">
        <div className="border-2 p-4 rounded-sm mb-3">
          <h2 className="text-2xl mb-1">Upload Image</h2>
          <Input
            type="file"
            id="file"
            hidden
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                image: e.target.files[0],
              }));
            }}
          />
          <Label htmlFor="file">
            <Image
              src={
                formData.image && typeof formData.image === "object"
                  ? URL.createObjectURL(formData.image)
                  : formData.image && typeof formData.image === "string"
                  ? `${process.env.NEXT_PUBLIC_API_URL}/images/${formData.image}`
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/800px-Placeholder_view_vector.svg.png"
              }
              alt="user-image"
              width={formData.image ? 200 : 100}
              height={formData.image ? 200 : 100}
              className="cursor-pointer rounded mt-2"
            />
          </Label>
        </div>
        <div className="border-2 p-4 rounded-sm">
          <h1 className="text-2xl mb-3">Category</h1>
          <RadioGroup>
            {categorys.map((value) => {
              return (
                <div className="flex items-center space-x-2" key={value}>
                  <RadioGroupItem
                    value={value.toLowerCase()}
                    id={value.toLowerCase()}
                    className="cursor-pointer"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        category: value,
                      }))
                    }
                    checked={value === formData.category}
                  />
                  <Label htmlFor={value.toLowerCase()}>{value}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default Write;
