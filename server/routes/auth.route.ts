import express from "express";
import multer from "multer";

import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/auth.controller";

const authRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

authRouter.post("/register", upload.single("image"), registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/logout", logoutUser);

export default authRouter;
