/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FormData = {
  email: string;
  password: string;
  username: string;
  image: any;
};

const intialState = {
  email: "",
  password: "",
  username: "",
  image: "",
};

const Register = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(intialState);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log("register Successful:", data);
      setFormData(intialState);
      router.push("/login");
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
    registerObj.append("username", formData.username);
    registerObj.append("email", formData.email);
    registerObj.append("password", formData.password);
    registerObj.append("image", formData.image);
    mutation.mutate(registerObj);
  };

  return (
    <div className="w-[38%] m-auto p-5 rounded-md mt-[3%]">
      <h1 className="text-center text-3xl font-bold mb-5">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-5 w-[90%] mx-auto border-2 px-5 py-2 rounded gap-3 flex items-center justify-center">
          <Label htmlFor="user-image" className="cursor-pointer mb-2">
            <Image
              src={
                formData.image
                  ? URL.createObjectURL(formData.image)
                  : "https://cdn.vectorstock.com/i/500p/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg"
              }
              alt="user-image"
              width={formData.image ? 150 : 100}
              height={formData.image ? 150 : 100}
              className="cursor-pointer object-fill rounded-full"
            />
          </Label>
        </div>
        <Input
          type="file"
          className="mb-3 mt-1"
          name="image"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              image: e.target.files[0],
            }))
          }
          id="user-image"
          hidden
          required
        />
        <Label>Username</Label>
        <Input
          placeholder="Enter your username"
          type="text"
          className="mb-3 mt-1"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Label>Email</Label>
        <Input
          placeholder="Enter your email"
          type="email"
          className="mb-3 mt-1"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Label>Password</Label>
        <div className="flex gap-1 item-center mb-3 mt-1">
          <Input
            className="max-w-xs"
            placeholder="enter password"
            type={isVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button onClick={() => setIsVisible((prev) => !prev)} type="button">
            {isVisible ? <IoEyeOff /> : <IoEye />}
          </Button>
        </div>
        <Button
          type="submit"
          className="w-full mt-5 cursor-pointer rounded"
          color="primary"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Loading..." : "Register"}
        </Button>
      </form>
      <Separator className="my-5 h-0.5 text-gray-600" />
      <p className="text-center">
        Already have a Account?{" "}
        <Link href={"/login"} className="hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
