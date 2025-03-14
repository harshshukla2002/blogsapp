import { Response } from "express";
import { db } from "../config/db";

export const updateUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    // Fetch the existing user data to preserve the current image if no new image is uploaded
    const getUserQuery = "SELECT `image` FROM users WHERE `id` = ?";
    db.query(getUserQuery, [id], (getUserErr, getUserResult: any) => {
      if (getUserErr) {
        return res.status(500).json({
          message: getUserErr.message || "Error fetching existing user",
          success: false,
        });
      }

      // Retain existing image if no new image is uploaded
      const existingImage = getUserResult[0].image;
      const userImage = req.file?.filename || existingImage;

      // Update query
      const updateQuery =
        "UPDATE users SET `username` = ?, `email` = ?, `image` = ? WHERE `id` = ?";
      const values = [username, email, userImage];

      db.query(updateQuery, [...values, id], (updateErr, updateResult) => {
        if (updateErr) {
          return res.status(500).json({
            message: updateErr.message || "Error updating user",
            success: false,
          });
        }

        // Return updated user details
        const selectQuery =
          "SELECT `id`, `username`, `email`, `image` FROM users WHERE `id` = ?";
        db.query(selectQuery, [id], (selectErr, selectResult: any) => {
          if (selectErr) {
            return res.status(500).json({
              message: selectErr.message || "Error fetching updated user",
              success: false,
            });
          }

          return res.status(200).json({
            message: "User updated successfully",
            success: true,
            user: selectResult[0],
          });
        });
      });
    });
  } catch (error: any) {
    console.error("Error updating user:", error.message || error);
    res.status(500).json({
      message: error.message || "Error updating user",
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
        .clearCookie("access-token", {
          sameSite: true,
          secure: true,
        })
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
