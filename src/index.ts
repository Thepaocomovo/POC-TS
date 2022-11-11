import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookRoouter from "./routers/Books.router.js";
import authRouter from "./routers/Auth.router.js";

dotenv.config();

const server = express();

server
    .use(cors())
    .use(express.json())
    .use(bookRoouter)
    .use(authRouter)

server.get("/", (req, res) => {
    return res.sendStatus(200);
});

server.listen(process.env.PORT, () =>
    console.log("Listening on port " + process.env.PORT)
);
