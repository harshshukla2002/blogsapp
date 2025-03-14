/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

type LoginUser = {
  username: string;
  password: string;
};

export const login = async (body: LoginUser) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    body,
    { withCredentials: true }
  );

  return response.data;
};

export const register = async (body: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
    body
  );

  return response.data;
};
