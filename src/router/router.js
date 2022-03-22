import express from "express";

import {
  createMessage, 
  updateMessage, 
  deleteMessage, 
  findMessage, 
  getOneMessage

} from "../controller/messagecontroller.js";

import ContactValidator from "../middleware/contact-middleware.js";

import { createComment, getAllComment, deleteComment } from "../controller/commcontroller.js";

import { addnewUser, getAllUser, deteleUser, updateUser, loginUser, getOneUser, getUserInfo} from "../controller/usercontroller.js";

import {isLogin, isAdmin} from "../middleware/isAuth-middleware.js"

// routes for messages

const router = express.Router();
router.post("/message", isLogin, ContactValidator, createMessage);
router.get("/message", isLogin, findMessage);
router.put("/message/:id", isLogin, updateMessage);
router.delete("/message/:id", isLogin, deleteMessage);
router.get("/message/:id", isLogin, getOneMessage);

// routes for comment

router.post("/comment/:id", isLogin, createComment);
router.get("/comment/:id", getAllComment);
router.delete("/blog/:blogId/comments/:commentId",deleteComment)

// routes for the user

router.post("/user", addnewUser);
router.get("/user", isLogin, isAdmin, getAllUser);
router.get("/user/:id", getOneUser);
router.delete("/user/:id", isLogin, deteleUser);
router.patch("/user/:id", isLogin, updateUser);
router.post("/user/login", loginUser);
router.get("/userinfo", isLogin, getUserInfo);



export default router;
