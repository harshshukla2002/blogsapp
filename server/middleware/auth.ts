import jwt from "jsonwebtoken";

const authMiddleware = async (req: any, res: any, next: any) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "token not provided" });
  }

  try {
    const tokenDecode: any = jwt.verify(token, process.env.JWT_KEY!);
    if (tokenDecode) {
      req.user = tokenDecode;
      next();
    }
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message || "error on token",
      error,
    });
  }
};

export default authMiddleware;
