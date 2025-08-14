import dotenv from 'dotenv'
import authRouter from './routes/authRouter.js';
dotenv.config({
    path: './.env'
})


import express from "express";
import connection from './db/databaseconnection.js';



const app = express();
app.get('/', (req, res) => {
    return res.json({ "username": "jay" })
})

app.use(express.json({ limit: "16kb" }))
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
