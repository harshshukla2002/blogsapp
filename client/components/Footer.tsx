"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <div className="mt-[10%] flex justify-between items-center bg-green-300 p-8">
      <Image
        src={"https://cdn-icons-png.flaticon.com/512/60/60736.png"}
        alt="logo"
        width={40}
        height={40}
        className="cursor-pointer"
      />
      <p className="text-sm">
        Made with 💟 and <b>NextJS.</b>
      </p>
    </div>
  );
};

export default Footer;
