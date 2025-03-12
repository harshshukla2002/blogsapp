import { Request, Response } from "express";
import { db } from "../config/db";
import moment from "moment";

export const addPost = async (req: any, res: Response) => {
  try {
    const { title, desc, category } = req.body;
    const postImage = `${req.file?.filename}`;
    const { id: userId } = req.user;
    const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    const query =
      "INSERT INTO posts(`title`, `desc`, `image`, `category`, `date`, `uid`) VALUES (?)";

    const values = [title, desc, postImage, category, date, userId];

    db.query(query, [values], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message || "error on add post",
          success: false,
          error: err,
        });
      }

      return res
        .status(200)
        .json({ message: "post added successfully", success: true });
    });
  } catch (error: any) {
    console.error("error on add post", error.message || error);
    res.status(500).json({
      message: error.message || "error on add post",
      success: false,
      error: error,
    });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const query = category
      ? "SELECT * FROM posts WHERE category ?"
      : "SELECT * FROM posts";

    db.query(query, [category], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message || "error on get all posts",
          success: false,
          error: err,
        });
      }

      return res.status(200).json({ posts: result, success: true });
    });
  } catch (error: any) {
    console.error("error on get all post", error.message || error);
    res.status(500).json({
      message: error.message || "error on get all posts",
      success: false,
      error: error,
    });
  }
};

export const getSinglePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query =
      "SELECT `username`, `title`, `desc`, p.image, u.image AS userImage, `category`, `date`, FROM users u JOIN posts p ON u.id === p.uid WHERE p.id = ?";

    db.query(query, [id], (err, result: any) => {
      if (err) {
        return res.status(500).json({
          message: err.message || "error on get all post",
          success: false,
          error: err,
        });
      }

      return res.status(200).json({ post: result[0], success: true });
    });
  } catch (error: any) {
    console.error("error on get single post", error.message || error);
    res.status(500).json({
      message: error.message || "error on get single post",
      success: false,
      error: error,
    });
  }
};

export const updatePosts = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { title, desc, category } = req.body;
    const { id: userId } = req.user;
    const postImage = `${req.file?.filename}`;
    const query =
      "UPDATE posts SET `title` = ?, `desc` = ?, `image` = ?, `category` = ? WHERE `id` = ? AND `uid` = ?";

    const values = [title, desc, postImage, category];

    db.query(query, [...values, id, userId], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message || "error on update post",
          success: false,
          error: err,
        });
      }

      return res
        .status(200)
        .json({ message: "post updated successfully", success: true });
    });
  } catch (error: any) {
    console.error("error on update post", error.message || error);
    res.status(500).json({
      message: error.message || "error on update post",
      success: false,
      error: error,
    });
  }
};

export const deletePosts = async (req: any, res: Response) => {
  try {
    const { id: postId } = req.params;
    const { id: userId } = req.user;
    const query = "DELETE FROM posts WHERE `id`= ? AND `uid` = ?";

    db.query(query, [postId, userId], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message || "error on delete posts",
          success: false,
          error: err,
        });
      }

      return res
        .status(200)
        .json({ message: "post deleted successfully", success: true });
    });
  } catch (error: any) {
    console.error("error on delete post", error.message || error);
    res.status(500).json({
      message: error.message || "error on delete post",
      success: false,
      error: error,
    });
  }
};
