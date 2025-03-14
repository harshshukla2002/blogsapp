import React from "react";
import { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QueryProvider from "./queryProvider";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"], // Optimize for Latin characters
  weight: ["300", "400", "500", "600", "700"], // Select font weights
  variable: "--font-poppins", // Set a CSS variable
});

export const metadata: Metadata = {
  title: "Blogs App",
  description: "This is blogs App",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={`${poppins.variable} antialiased w-[1024px] mx-auto`}>
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
