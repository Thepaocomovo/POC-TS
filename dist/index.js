import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookRoouter from "./routers/Books.router.js";
import authRouter from "./routers/Auth.router.js";
dotenv.config();
var server = express();
server
    .use(cors())
    .use(express.json())
    .use(bookRoouter)
    .use(authRouter);
server.get("/", function (req, res) {
    return res.sendStatus(200);
});
server.listen(process.env.PORT, function () {
    return console.log("Listening on port " + process.env.PORT);
});
