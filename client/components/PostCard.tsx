import Image from "next/image";
import React from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

type PostCardParams = {
  post: Post;
};

const PostCard = ({ post }: PostCardParams) => {
  return (
    <Card className="flex flex-row gap-10">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/images/${post.image}`}
        alt={post.title}
        width={200}
        height={200}
        className="object-cover rounded-tl-lg rounded-bl-lg"
      />

      <div className="py-5">
        <CardTitle className="text-xl">{post.title}</CardTitle>
        <CardDescription className="mt-3 text-base">
          {post.desc.replace(/(<([^>]+)>)/gi, "")}
        </CardDescription>
        <CardFooter>
          <Link href={`/post/${post.id}`}>
            <Button variant={"outline"} className="mt-[30%] ml-[-20%]">
              Read More
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostCard;
