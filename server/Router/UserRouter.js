import multer from "multer"
import express from "express"

import authorizatoinToken from "../Middleware/authorizatoinToken.js"

import {
  Register, 
  Login, 
  GetUser, 
  GetUserFriends, 
  AddRemoveFriend
} from "../Controller/UserController.js"

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

router.post('/register', upload.single("picture"), Register)
router.post('/login', Login)
router.get('/:id', authorizatoinToken, GetUser)
router.get('/:id/friends', authorizatoinToken, GetUserFriends)
router.patch('/:id/:friendId', authorizatoinToken, AddRemoveFriend)

export default router

