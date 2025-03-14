/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import useUser from "@/store/UserStore";
import axios from "axios";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import usePostStore from "@/store/PostStore";

const Navbar = () => {
  const pathname = usePathname();
  const { user, token, setUser, setToken } = useUser((state: any) => state);
  const { setCategory } = usePostStore((state: any) => state);
  const router = useRouter();
  const categorys = [
    "Art",
    "Science",
    "Technology",
    "Cinema",
    "Design",
    "Food",
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    const token = localStorage.getItem("access_token");
    setUser(user);
    setToken(token);
  }, []);

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        { withCredentials: true }
      );
      router.push("/login");
      toast.success(response.data.message);
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
    } catch (error: any) {
      console.error(error?.response?.data?.message || "error on logout");
      toast.error(error?.response?.data?.message || "error on logout");
    }
  };

  return (
    <div className="">
      <div className="py-2 flex justify-between items-center">
        <Link href={"/"} onClick={() => setCategory("")}>
          <Image
            src={"https://cdn-icons-png.flaticon.com/512/60/60736.png"}
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
        <div className="flex gap-5">
          {categorys.map((value) => {
            return (
              <Link
                key={value}
                href={`/?${value}`}
                className="text-base text-black/70 hover:text-black"
                onClick={() => setCategory(value)}
              >
                {value}
              </Link>
            );
          })}
        </div>
        <div className="flex gap-5 items-center">
          {token ? (
            <>
              <Link href={`/user/${user.id}`}>
                <Badge
                  className="text-base text-black/70 hover:text-black cursor-pointer"
                  variant={"outline"}
                >
                  {user?.username}
                </Badge>
              </Link>
              <Button
                className="text-base text-white"
                onClick={handleLogout}
                variant={"destructive"}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href={"/login"}>
              <p className="text-base text-black/70 hover:text-black cursor-pointer">
                Login
              </p>
            </Link>
          )}
          <Button className="text-white">
            <Link className="text-base" href={"/write"}>
              Write
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
