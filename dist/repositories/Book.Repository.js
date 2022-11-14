import { connection } from "../database/Postgres.js";
var insertBook = function (name, author, pages) {
    return connection.query("\n        INSERT INTO books\n        (name, author, pages)\n        VALUES ($1, $2, $3)\n        RETURNING id\n    ;", [name, author, pages]);
};
var syncBookToUser = function (userId, bookId, readState) {
    return connection.query("\n        INSERT INTO \"userBooks\"\n        (\"userId\", \"bookId\", \"read\")\n        VALUES ($1, $2, $3)\n    ;", [userId, bookId, readState]);
};
var getAllUserBooks = function (userId) {
    return connection.query("\n        SELECT \"bookId\", read, name, author, pages, \"userBooks\".\"createdAt\"\n        FROM \"userBooks\"\n        JOIN books \n            ON books.id = \"bookId\"\n        WHERE \"userId\" = $1;\n;", [userId]);
};
var getUserBookById = function (bookId, userId) {
    return connection.query("\n        SELECT \"userBooks\".\"createdAt\", \"userBooks\".\"bookId\", \"userBooks\".read, books.name, books.author, books.pages \n        FROM \"userBooks\" \n        JOIN books\n            ON \"userBooks\".\"bookId\" = books.id \n        WHERE \"bookId\" = $1 AND \"userId\" = $2;\n    ;", [bookId, userId]);
};
var deleteUserBookByBookId = function (bookId, userId) {
    return connection.query("\n        DELETE FROM \"userBooks\" WHERE \n        \"userId\" = $1 AND \"bookId\" = $2\n;", [userId, bookId]);
};
var updateBook = function (book, bookId) {
    return connection.query("\n        UPDATE books SET name = $1, author = $2, pages = $3\n        WHERE id = $4\n    ;", [book.name, book.author, book.pages, bookId]);
};
var updateBookReadState = function (book, bookId) {
    connection.query("\n        UPDATE \"userBooks\" SET read = $1\n        WHERE \"bookId\" = $2\n    ;", [book.read, bookId]);
};
var getBookPages = function (userId) {
    return connection.query("\n        SELECT SUM(pages) as pages\n        FROM \"userBooks\"\n        JOIN books ON books.id = \"bookId\"\n        WHERE \"userId\" = $1 AND read = true;\n    ;", [userId]);
};
export { insertBook, syncBookToUser, getUserBookById, getAllUserBooks, deleteUserBookByBookId, updateBook, updateBookReadState, getBookPages };
