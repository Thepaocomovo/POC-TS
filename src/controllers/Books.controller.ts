import { STATUS_CODE } from "../enuns/StatusCodes.js";
import { Request, response, Response } from "express";
import { NewBookEntity, ToUpdateBook } from "../protocols/Book.types.js";
import { newBookSchema, editBookSchema } from "../schemas/BookSchemas.js";
import jwt from "jsonwebtoken";
import { QueryResult } from "pg";
import * as booksRepository from "../repositories/Book.Repository.js";

const createNewBook = async (req: Request, res: Response) => {
    if (!req.headers.authorization) return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    const token: string = req.headers.authorization.replace("Bearer ", "");
    const newBook = req.body as NewBookEntity;
    let bookId: number;
    let userId: number;
    const { error } = newBookSchema.validate(newBook);

    if (error) {
        return res.status(STATUS_CODE.BAD_REQUEST).send({
            message: error.message
        });
    }

    try {
        userId = (jwt.verify(token, process.env.TOKEN_SECRET).userId);
    } catch (error) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    try {
        const book: QueryResult = await booksRepository.insertBook(newBook.name, newBook.author, newBook.pages)
        bookId = book.rows[0].id
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    try {
        await booksRepository.syncBookToUser(userId, bookId, newBook.read)
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    return res.sendStatus(STATUS_CODE.CREATED);
};

const getBookList = async (req: Request, res: Response) => {
    if (!req.headers.authorization) return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    let bookList: QueryResult;
    const token: string = req.headers.authorization.replace("Bearer ", "");
    let userId: number;

    try {
        userId = (jwt.verify(token, process.env.TOKEN_SECRET).userId);
    } catch (error) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    try {
        bookList = await booksRepository.getAllUserBooks(userId);
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
    return res.status(STATUS_CODE.OK).send(bookList.rows);
};

const getUserBookById = async (req: Request, res: Response) => {
    if (!req.headers.authorization) return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    const token: string = req.headers.authorization.replace("Bearer ", "");
    const bookId: number = Number(req.params.id);
    let userId: number;
    let book: QueryResult;
    try {
        userId = (jwt.verify(token, process.env.TOKEN_SECRET).userId);
    } catch (error) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    try {
        book = await booksRepository.getUserBookById(bookId, userId);
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    return res.status(STATUS_CODE.OK).send(book.rows[0]);
};

const deleteUserBook = async (req: Request, res: Response) => {
    if (!req.headers.authorization) return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    const token: string = req.headers.authorization.replace("Bearer ", "");
    const bookId: number = Number(req.params.id);
    let userId: number;

    try {
        userId = (jwt.verify(token, process.env.TOKEN_SECRET).userId);
    } catch (error) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    try {
        const deleteQuery: QueryResult = await booksRepository.deleteUserBookByBookId(userId, bookId);
        if(deleteQuery.rowCount === 0) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    return res.sendStatus(STATUS_CODE.NO_CONTENT);
};

const editUserBook = async (req: Request, res: Response) => {
    if (!req.headers.authorization) return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    const token: string = req.headers.authorization.replace("Bearer ", "");
    const bookId: number = Number(req.params.id);
    let userId: number;
    const book = req.body as ToUpdateBook;
    const { error } = editBookSchema.validate(book);
    let existentBook: QueryResult;

    if (error) {
        return res.status(STATUS_CODE.BAD_REQUEST).send({
            message: error.message
        });
    }

    try {
        userId = (jwt.verify(token, process.env.TOKEN_SECRET).userId);
    } catch (error) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    try {
        existentBook = await booksRepository.getUserBookById(bookId, userId);
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    if (existentBook.rowCount === 0) {
        return res.sendStatus(STATUS_CODE.NOT_FOUND);
    }

    try {
        await booksRepository.updateBook(book, bookId);
        await booksRepository.updateBookReadState(book, bookId);
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    return res.sendStatus(STATUS_CODE.OK);
};

const getReadPages = async (req: Request, res: Response) => {
    if (!req.headers.authorization) return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    const token: string = req.headers.authorization.replace("Bearer ", "");
    let userId: number;
    let pages: QueryResult;

    try {
        userId = (jwt.verify(token, process.env.TOKEN_SECRET).userId);
    } catch (error) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    try {
        pages = await booksRepository.getBookPages(userId);
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
    return res.status(STATUS_CODE.OK).send(pages.rows[0]);
};

export {
    createNewBook,
    getBookList,
    getUserBookById,
    deleteUserBook,
    editUserBook,
    getReadPages
}