import express from "express"
import authenticateToken from "../Middleware/authorizatoinToken"

import {
  GetFeedPosts, 
  GetUserPosts, 
  LikePost
} from "../Controller/PostController.js" 
import { GetUser } from "../Controller/UserController"


const storage =  multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/assets")
  },
  filename: (req, res, cb) => {
    cb(null, file.orginalname)
  }
})
const upload = multer({storage})


const router = express.Router()

router.get('posts', authenticateToken, upload.single("picture", CreatePost))
router.get("/", authenticateToken, GetFeedPosts)
router.get(":/userId/posts", authenticateToken, GetUserPosts)
router.patch(":/id/like", authenticateToken, LikePost)

export default router