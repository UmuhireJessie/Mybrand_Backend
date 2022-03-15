import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;
let token;

const isLogin = (req, res, next) => {
  token = req.headers.authorization.split(" ")[1];

  if (!token)
    return res.status(403).json({ message: "You need to login first" });
  const user = jwt.verify(token, JWT_SECRET);
  req.user = user;
  
  next();
};

const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role == "admin") return next();
  return res.status(401).json({
    status: "fail",
    message: "You don't have permission to perform this action",
  });
};



export { isLogin, isAdmin };
