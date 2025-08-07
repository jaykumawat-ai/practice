import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})


import express from "epress"

const app = express();
import connection from './db/databaseconnection.js';
connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server running on port", process.env.PORT);

    })
}).catch((error) => {
    console.log("server connection failed");

});

