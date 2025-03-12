import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import postsRouter from "./routes/posts.route";
import authRouter from "./routes/auth.route";
import usersRouter from "./routes/users.route";

const server = express();
const PORT = 4001;

server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use("/images", express.static("uploads"));
server.use("/api/posts", postsRouter);
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running", success: true });
});

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}/`);
});
