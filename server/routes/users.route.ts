import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/auth";
import { deleteUser, updateUser } from "../controller/users.controller";

const usersRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

usersRouter.patch(
  "/update/:id",
  authMiddleware,
  upload.single("image"),
  updateUser
);
usersRouter.delete("/delete/:id", authMiddleware, deleteUser);

export default usersRouter;
