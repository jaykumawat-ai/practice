import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js';
import cors from "cors";
dotenv.config({
    path: './.env'
})



import express from "express";
import connection from './db/databaseconnection.js';
import userRouter from './routes/user.route.js';
import cookieParser from "cookie-parser";
import postRouter from './routes/post.routes.js';
import commentRouter from './routes/comment.route.js';


const app = express();
app.get('/', (req, res) => {
    return res.json({ "username": "jay" })
})


app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())
//connection
connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server running on port", process.env.PORT);

    })
}).catch((error) => {
    console.log("server connection failed", error);

});

//routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/comment", commentRouter)