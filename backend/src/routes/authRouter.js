
import express from 'express'
import { upload } from "../middlewares/multer.middleware.js"
import { register, signIn, signOut } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.route("/register").post(
    upload.single("userImage"),
    register)

authRouter.route("/signIn").post(signIn)

authRouter.route("/signOut").post(signOut)

export default authRouter;