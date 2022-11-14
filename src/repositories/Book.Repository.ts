import { connection } from "../database/Postgres.js";
import { QueryResult } from "pg";

const insertBook = (name: string, author: string, pages: number): Promise<QueryResult> => {
    return connection.query(`
        INSERT INTO books
        (name, author, pages)
        VALUES ($1, $2, $3)
        RETURNING id
    ;`, [name, author, pages])
}

const syncBookToUser = (userId, bookId, readState) => {
    return connection.query(`
        INSERT INTO "userBooks"
        ("userId", "bookId", "read")
        VALUES ($1, $2, $3)
    ;`, [userId, bookId, readState])
}

const getAllUserBooks = (userId) => {
    return connection.query(`
        SELECT "bookId", read, name, author, pages, "userBooks"."createdAt"
        FROM "userBooks"
        JOIN books 
            ON books.id = "bookId"
        WHERE "userId" = $1;
;`, [userId])
}


const getUserBookById = (bookId: number, userId: number) => {
    return connection.query(`
        SELECT "userBooks"."createdAt", "userBooks"."bookId", "userBooks".read, books.name, books.author, books.pages 
        FROM "userBooks" 
        JOIN books
            ON "userBooks"."bookId" = books.id 
        WHERE "bookId" = $1 AND "userId" = $2;
    ;`, [bookId, userId])
}

const deleteUserBookByBookId = (userId: number, bookId: number) => {
    return connection.query(`
        DELETE FROM "userBooks" WHERE 
        "userId" = $1 AND "bookId" = $2
;`, [userId, bookId])
}

const updateBook = (book, bookId: number) => {
    return connection.query(`
        UPDATE books SET name = $1, author = $2, pages = $3
        WHERE id = $4
    ;`, [book.name, book.author, book.pages, bookId]);

}

const updateBookReadState = (book, bookId) => {
    connection.query(`
        UPDATE "userBooks" SET read = $1
        WHERE "bookId" = $2
    ;`, [book.read, bookId]);
}

const getBookPages = (userId: number) => {
    return connection.query(`
        SELECT SUM(pages) as pages
        FROM "userBooks"
        JOIN books ON books.id = "bookId"
        WHERE "userId" = $1 AND read = true;
    ;`, [userId])
}


export {
    insertBook,
    syncBookToUser,
    getUserBookById,
    getAllUserBooks,
    deleteUserBookByBookId,
    updateBook,
    updateBookReadState,
    getBookPages
};