import bcrypt from "bcrypt";
import { STATUS_CODE } from "../enuns/StatusCodes.js";
import { Request, Response } from "express";
import { newUserSchema } from "../schemas/UserSchemas.js";
import { connection } from "../database/Postgres.js";
import { NewUserEntity } from "../protocols/User.types.js";
import * as authRepository from "../repositories/Auth.repository.js";





const signUp = async (req: Request, res: Response) => {
    if (!req.body) return res.status(STATUS_CODE.BAD_REQUEST).send("body is missing");
    const newUser = req.body as NewUserEntity;
    const { error } = newUserSchema.validate(newUser)

    if (error) {
        return res.status(STATUS_CODE.BAD_REQUEST).send({
            message: error.message
        });
    }

    newUser.email = newUser.email.toLowerCase();
    newUser.password = bcrypt.hashSync(newUser.password, 10);

    const existentUser = await authRepository.getUserByEmail(newUser.email);

    if(existentUser.rowCount > 0) {
        return res.status(STATUS_CODE.CONFLICT).send("email already registered");
    }

    await authRepository.insertUser(newUser)
    
    return res.sendStatus(STATUS_CODE.CREATED);
}


export {
    signUp,
}