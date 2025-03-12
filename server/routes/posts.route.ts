import express from "express";
import multer from "multer";

import {
  addPost,
  deletePosts,
  getAllPosts,
  getSinglePost,
  updatePosts,
} from "../controller/posts.controller";
import authMiddleware from "../middleware/auth";

const postsRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

postsRouter.post("/add", authMiddleware, upload.single("image"), addPost);
postsRouter.get("/", authMiddleware, getAllPosts);
postsRouter.get("/:id", authMiddleware, getSinglePost);
postsRouter.patch(
  "/update/:id",
  authMiddleware,
  upload.single("image"),
  updatePosts
);
postsRouter.delete("/delete/:id", authMiddleware, deletePosts);

export default postsRouter;
