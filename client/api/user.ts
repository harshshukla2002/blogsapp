/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const token = localStorage.getItem("access_token");

export const updateUser = async ({ body, id }: { body: any; id: number }) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/update/${id}`,
    body,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/delete/${id}`,
    { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
  );

  return response.data;
};
