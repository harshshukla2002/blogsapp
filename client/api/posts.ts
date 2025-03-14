/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const token = localStorage.getItem("access_token");

export const getAllPosts = async (category?: string) => {
  if (category) {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/?category=${category}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } else {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
};

export const getSinglePost = async (id: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

export const createPost = async (body: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/add`,
    body,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

export const updatePost = async ({ body, id }: { body: any; id: number }) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/update/${id}`,
    body,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/delete/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};
