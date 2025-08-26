import express from 'express'
import { updateDetails, updateUserImage, deleteUser, changepassword } from "../controllers/user.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js"
import { upload } from '../middlewares/multer.middleware.js'




const userRouter = express.Router()




userRouter.route("/update-details").patch(verifyJWT, updateDetails)


userRouter.route("/change_password").post(verifyJWT, changepassword)

userRouter.route("/update-userImage").patch( verifyJWT,upload.single("userImage"),updateUserImage)

userRouter.route("/delete-user").delete(verifyJWT, deleteUser)

export default userRouter;