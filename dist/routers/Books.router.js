import express from "express";
import * as booksController from "../controllers/Books.controller.js";
var router = express.Router();
router.post("/book", booksController.insertNewBook);
export default router;
