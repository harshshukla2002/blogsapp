import { Response } from "express";
import { db } from "../config/db";

export const updateUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const userImage = `${req.file?.filename}`;
    const query =
      "UPDATE users SET `username` = ?, `email` = ?, `image` = ? WHERE `id` = ?";

    const values = [username, email, userImage];

    db.query(query, [...values, id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message || "error on update user",
          success: false,
          error: err,
        });
      }

      return res
        .status(200)
        .json({ message: "user updated successfully", success: true });
    });
  } catch (error: any) {
    console.error("error on update user", error.message || error);
    res.status(500).json({
      message: error.message || "error on update user",
      success: false,
      error: error,
    });
  }
};

export const deleteUser = async (req: any, res: Response) => {
  try {
    const { id: userId } = req.params;
    const query = "DELETE FROM users WHERE `id`= ?";

    db.query(query, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message || "error on delete user",
          success: false,
          error: err,
        });
      }

      return res
        .status(200)
        .json({ message: "user deleted successfully", success: true });
    });
  } catch (error: any) {
    console.error("error on user post", error.message || error);
    res.status(500).json({
      message: error.message || "error on delete user",
      success: false,
      error: error,
    });
  }
};
