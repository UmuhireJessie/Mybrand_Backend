import express from "express";

import {
  createMessage, 
  updateMessage, 
  deleteMessage, 
  findMessage, 
  getOneMessage

} from "../controller/messagecontroller.js";

import ContactValidator from "../middleware/contact-middleware.js";

import {
  createBlog,
  findAllBlog,
  findOneBlog,
  updateBlog,
  deleteBlog,
} from "../controller/controllerblog.js";

import BlogValidator from "../middleware/blog-middleware.js";

import { createComment, getAllComment } from "../controller/commcontroller.js";

import { addnewUser, getAllUser, deteleUser, updateUser, loginUser, getOneUser} from "../controller/usercontroller.js";

import {isLogin, isAdmin} from "../middleware/isAuth-middleware.js"

// routes for messages

const router = express.Router();
router.post("/message", isLogin, ContactValidator, createMessage);
router.get("/message", isLogin, findMessage);
router.put("/message/:id", isLogin, updateMessage);
router.delete("/message/:id", isLogin, deleteMessage);
router.get("/message/:id", isLogin, getOneMessage);

// Routes for blog

router.post("/blog", isLogin, isAdmin, BlogValidator, createBlog);
router.get("/blog", findAllBlog);
router.get("/blog/:id", findOneBlog);
router.patch("/blog/:id", isLogin, updateBlog);
router.delete("/blog/:id", isLogin, deleteBlog);

// routes for comment

router.post("/comment/:id", isLogin, createComment);
router.get("/comment/:id", getAllComment);

// routes for the user
router.post("/user", addnewUser);
router.get("/user", isLogin, isAdmin, getAllUser);
router.get("/user/:id", getOneUser);
router.delete("/user/:id", isLogin, deteleUser);
router.patch("/user/:id", isLogin, updateUser);
router.post("/user/login", loginUser);


export default router;
