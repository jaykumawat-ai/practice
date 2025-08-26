import express from "express"
import { deleteComment,createComment,getComment } from "../controllers/comment.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js"

const commentRouter = express.Router()

commentRouter.route("/create-comment").post(verifyJWT,createComment)

commentRouter.route("/delete-comment/:commentId").delete( verifyJWT,deleteComment)

commentRouter.route("/get-comment/:postId").get(getComment)

export default commentRouter;