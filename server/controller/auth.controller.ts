import e, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../config/db";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const userImage = `${req.file?.filename}`;
    const query = "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(query, [email, username], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message || "error on register user",
          success: false,
          error: err,
        });
      }

      if ((result as any[]).length) {
        return res
          .status(409)
          .json({ message: "user already exist", success: false });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const insertQuery =
        "INSERT INTO users (`username`, `email`, `password`, `image`) VALUES (?,?,?,?)";

      db.query(
        insertQuery,
        [username, email, hashedPassword, userImage],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: err.message || "error on register user",
              success: false,
              error: err,
            });
          }
          return res.status(200).json({
            message: "user registered successfully",
            success: true,
          });
        }
      );
    });
  } catch (error: any) {
    console.error("error on register user", error.message || error);
    res.status(500).json({
      message: error.message || "error on register user",
      success: false,
      error: error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const findQuery = "SELECT * FROM users WHERE username = ?";
    const { username, password: userPassword } = req.body;

    db.query(findQuery, [username], (err, result: any[]) => {
      if (err) {
        return res.status(500).json({
          message: err.message || "error on register user",
          success: false,
          error: err,
        });
      }

      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "user not found", success: false });
      }
      const user = result[0];
      const isPassword = bcrypt.compareSync(userPassword, user.password);

      if (!isPassword) {
        return res
          .status(401)
          .json({ message: "wrong password", success: false });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_KEY!);
      const { password, ...other } = result[0];

      res
        .cookie("access-token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          message: "login successful",
          user: other,
          success: true,
          token,
        });
    });
  } catch (error: any) {
    console.error("error on login user", error.message || error);
    res.status(500).json({
      message: error.message || "error on login user",
      success: false,
      error: error,
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res
      .clearCookie("access_token", {
        sameSite: true,
        secure: true,
      })
      .status(200)
      .json({ message: "logout successfully", success: true });
  } catch (error: any) {
    console.error("error on logout user", error.message || error);
    res.status(500).json({
      message: error.message || "error on logout user",
      success: false,
      error: error,
    });
  }
};
