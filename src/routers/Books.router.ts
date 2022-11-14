import express from "express";
import * as booksController from "../controllers/Books.controller.js";

const router = express.Router();

router.post("/books", booksController.createNewBook); 
router.get("/books", booksController.getBookList);
router.get("/book/:id", booksController.getUserBookById);
router.get("/pages", booksController.getReadPages);
router.delete("/book/:id", booksController.deleteUserBook);
router.put("/book/:id", booksController.editUserBook);



export default router;