import express from "express";
import * as booksController from "../controllers/Books.controller.js";


const router = express.Router();

router.post("/book", booksController.insertNewBook);


export default router;