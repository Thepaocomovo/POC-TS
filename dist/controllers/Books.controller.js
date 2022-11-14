var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { STATUS_CODE } from "../enuns/StatusCodes.js";
import { newBookSchema, editBookSchema } from "../schemas/BookSchemas.js";
import jwt from "jsonwebtoken";
import * as booksRepository from "../repositories/Book.Repository.js";
var createNewBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, newBook, bookId, userId, error, book, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.headers.authorization)
                    return [2 /*return*/, res.sendStatus(STATUS_CODE.BAD_REQUEST)];
                token = req.headers.authorization.replace("Bearer ", "");
                newBook = req.body;
                error = newBookSchema.validate(newBook).error;
                if (error) {
                    return [2 /*return*/, res.status(STATUS_CODE.BAD_REQUEST).send({
                            message: error.message
                        })];
                }
                try {
                    userId = (jwt.verify(token, process.env.TOKEN_SECRET).userId);
                }
                catch (error) {
                    return [2 /*return*/, res.sendStatus(STATUS_CODE.UNAUTHORIZED)];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, booksRepository.insertBook(newBook.name, newBook.author, newBook.pages)];
            case 2:
                book = _a.sent();
                bookId = book.rows[0].id;
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR)];
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, booksRepository.syncBookToUser(userId, bookId, newBook.read)];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR)];
            case 7: return [2 /*return*/, res.sendStatus(STATUS_CODE.CREATED)];
        }
    });
}); };
var getBookList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bookList, token, userId, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.headers.authorization)
                    return [2 /*return*/, res.sendStatus(STATUS_CODE.BAD_REQUEST)];
                token = req.headers.authorization.replace("Bearer ", "");
                try {
                    userId = (jwt.verify(token, process.env.TOKEN_SECRET).userId);
                }
                catch (error) {
                    return [2 /*return*/, res.sendStatus(STATUS_CODE.UNAUTHORIZED)];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, booksRepository.getAllUserBooks(userId)];
            case 2:
                bookList = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR)];
            case 4: return [2 /*return*/, res.status(STATUS_CODE.OK).send(bookList.rows)];
        }
    });
}); };
var getUserBookById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, bookId, userId, book, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.headers.authorization)
                    return [2 /*return*/, res.sendStatus(STATUS_CODE.BAD_REQUEST)];
                token = req.headers.authorization.replace("Bearer ", "");
                bookId = Number(req.params.id);
                try {
                    userId = (jwt.verify(token, process.env.TOKEN_SECRET).userId);
                }
                catch (error) {
                    return [2 /*return*/, res.sendStatus(STATUS_CODE.UNAUTHORIZED)];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, booksRepository.getUserBookById(bookId, userId)];
            case 2:
                book = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR)];
            case 4: return [2 /*return*/, res.status(STATUS_CODE.OK).send(book.rows[0])];
        }
    });
}); };
var deleteUserBook = function (req, res) {
    if (!req.headers.authorization)
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    var token = req.headers.authorization.replace("Bearer ", "");
    var bookId = Number(req.params.id);
    var userId;
    try {
        userId = (jwt.verify(token, process.env.TOKEN_SECRET).userId);
    }
    catch (error) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }
    try {
        booksRepository.deleteUserBookByBookId(userId, bookId);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
    return res.sendStatus(STATUS_CODE.NO_CONTENT);
};
var editUserBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, bookId, userId, book, error, existentBook, error_5, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.headers.authorization)
                    return [2 /*return*/, res.sendStatus(STATUS_CODE.BAD_REQUEST)];
                token = req.headers.authorization.replace("Bearer ", "");
                bookId = Number(req.params.id);
                book = req.body;
                error = editBookSchema.validate(book).error;
                if (error) {
                    return [2 /*return*/, res.status(STATUS_CODE.BAD_REQUEST).send({
                            message: error.message
                        })];
                }
                try {
                    userId = (jwt.verify(token, process.env.TOKEN_SECRET).userId);
                }
                catch (error) {
                    return [2 /*return*/, res.sendStatus(STATUS_CODE.UNAUTHORIZED)];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, booksRepository.getUserBookById(bookId, userId)];
            case 2:
                existentBook = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [2 /*return*/, res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR)];
            case 4:
                if (existentBook.rowCount === 0) {
                    return [2 /*return*/, res.sendStatus(STATUS_CODE.NOT_FOUND)];
                }
                _a.label = 5;
            case 5:
                _a.trys.push([5, 8, , 9]);
                return [4 /*yield*/, booksRepository.updateBook(book, bookId)];
            case 6:
                _a.sent();
                return [4 /*yield*/, booksRepository.updateBookReadState(book, bookId)];
            case 7:
                _a.sent();
                return [3 /*break*/, 9];
            case 8:
                error_6 = _a.sent();
                console.log(error_6);
                return [2 /*return*/, res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR)];
            case 9: return [2 /*return*/, res.sendStatus(STATUS_CODE.OK)];
        }
    });
}); };
var getReadPages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, userId, pages, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.headers.authorization)
                    return [2 /*return*/, res.sendStatus(STATUS_CODE.BAD_REQUEST)];
                token = req.headers.authorization.replace("Bearer ", "");
                try {
                    userId = (jwt.verify(token, process.env.TOKEN_SECRET).userId);
                }
                catch (error) {
                    return [2 /*return*/, res.sendStatus(STATUS_CODE.UNAUTHORIZED)];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, booksRepository.getBookPages(userId)];
            case 2:
                pages = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.log(error_7);
                return [2 /*return*/, res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR)];
            case 4: return [2 /*return*/, res.status(STATUS_CODE.OK).send(pages.rows[0])];
        }
    });
}); };
export { createNewBook, getBookList, getUserBookById, deleteUserBook, editUserBook, getReadPages };
