import express from "express";

import { createBlog, findAllBlog, findOneBlog, updateBlog, deleteBlog} from "../controller/controllerblog.js";
  
import blogValidator from "../middleware/blog-middleware.js";

import {isLogin, isAdmin} from "../middleware/isAuth-middleware.js";

import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};
const upload = multer({ storage, fileFilter });

router.get("/blog", findAllBlog);
router.post(
  "/blog",
  isLogin,
  isAdmin,
  upload.single("blogimage"),  
  blogValidator,

  createBlog
);

export default router;