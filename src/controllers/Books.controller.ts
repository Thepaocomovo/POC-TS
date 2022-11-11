import { STATUS_CODE } from "../enuns/StatusCodes.js";
import { Request, Response } from "express";

type teste = {
	name: string,
	author: string,
	pages: number,
	genre: string,
    synopsis?: string
};

const insertNewBook = (req: Request, res: Response) => {
    const teste = req.body as teste;

    

    res.sendStatus(STATUS_CODE.CREATED);
}

export  {
    insertNewBook,

}