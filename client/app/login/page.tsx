/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useUser from "@/store/UserStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

type FormData = {
  username: string;
  password: string;
};

const intialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(intialState);
  const setUser = useUser((state: any) => state.setUser);
  const setToken = useUser((state: any) => state.setToken);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setFormData(intialState);
      router.push("/");
      toast.success(data.message);
    },
    onError: (error: any) => {
      console.error(
        "Login Failed:",
        error?.response?.data?.message || "error on login"
      );
      toast.error(error?.response?.data?.message || "error on login");
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="w-[36%] m-auto p-5 rounded-md mt-[10%]">
      <h1 className="text-center text-2xl mb-5">LOGIN</h1>

      <form onSubmit={handleSubmit}>
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
        <Label>Password</Label>
        <div className="flex gap-1 item-center mt-1">
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
          className="w-full mt-5 cursor-pointer"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Loading" : "Login"}
        </Button>
      </form>
      <Separator className="my-5 h-0.5 text-gray-600" />
      <p className="text-center">
        Don't have a Account?{" "}
        <Link href={"/register"} className="hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
