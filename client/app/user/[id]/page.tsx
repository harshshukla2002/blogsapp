/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { deleteUser, updateUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useUser from "@/store/UserStore";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type FormData = {
  username: string;
  email: string;
  image: any;
};

const intialState: FormData = {
  email: "",
  username: "",
  image: "",
};

const UserPage = () => {
  const { user, setUser, setToken } = useUser((state: any) => state);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(user || intialState);
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      console.log("delete Successful:", data);
      toast.success(data.message);
      setUser(null);
      setToken(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      router.push("/register");
    },
    onError: (error: any) => {
      console.error(
        "Login Failed:",
        error?.response?.data?.message || "error on delete user"
      );
      toast.error(error?.response?.data?.message || "error on delete user");
    },
  });

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log("update Successful:", data);
      toast.success(data.message);
      setUser(data.user);
      setIsEdit(false);
    },
    onError: (error: any) => {
      console.error(
        "Login Failed:",
        error?.response?.data?.message || "error on update user"
      );
      toast.error(error?.response?.data?.message || "error on update user");
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    const registerObj = new FormData();
    registerObj.append("username", formData.username);
    registerObj.append("email", formData.email);
    registerObj.append("image", formData.image);
    mutation.mutate({ body: registerObj, id: user.id });
  };

  return (
    <div className="mt-10 text-center w-md mx-auto">
      {isEdit ? (
        <Card className="p-3">
          <CardHeader>
            <CardTitle className="text-xl">Edit</CardTitle>
            <CardDescription className="text-lg">
              Edit your details
            </CardDescription>
            <Separator />
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="my-5 w-[90%] mx-auto px-5 py-2 rounded gap-3 flex items-center justify-center">
                  <Label htmlFor="user-image" className="cursor-pointer mb-2">
                    <Image
                      src={
                        formData.image && typeof formData.image === "object"
                          ? URL.createObjectURL(formData.image)
                          : formData.image && typeof formData.image === "string"
                          ? `${process.env.NEXT_PUBLIC_API_URL}/images/${formData.image}`
                          : "https://cdn.vectorstock.com/i/500p/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg"
                      }
                      alt="user-image"
                      width={formData.image ? 150 : 100}
                      height={formData.image ? 150 : 100}
                      className="cursor-pointer rounded-full mt-2"
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
                <Button
                  type="submit"
                  className="w-full mt-5 cursor-pointer rounded"
                  color="primary"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Loading..." : "Update"}
                </Button>
              </form>
            </CardContent>
          </CardHeader>
        </Card>
      ) : (
        <>
          <h1 className="text-3xl capitalize">Hello, {user?.username}</h1>
          <Card className="flex flex-col gap-6 mt-5 items-center justify-center p-3 mx-auto w-md">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/images/${user?.image}`}
              alt={user?.username}
              width={150}
              height={150}
              className="rounded-full"
            />
            <h1 className="text-lg">Email: {user?.email}</h1>
            <div className="flex gap-3">
              <Button variant={"outline"} onClick={() => setIsEdit(true)}>
                Update
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => deleteMutation.mutate(user.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default UserPage;
