import bcrypt from "bcrypt";
import { STATUS_CODE } from "../enuns/StatusCodes.js";
import { Request, Response } from "express";
import { newUserSchema, SignInSchema } from "../schemas/UserSchemas.js";
import { NewUserEntity, UserSignIn, UserEntity } from "../protocols/User.types.js";
import * as authRepository from "../repositories/Auth.repository.js";
import jwt from "jsonwebtoken";
import { QueryResult } from "pg";


const signUp = async (req: Request, res: Response) => {
    const newUser = req.body as NewUserEntity;
    let existentUser: QueryResult<UserEntity>;
    const { error } = newUserSchema.validate(newUser);

    if (error) {
        return res.status(STATUS_CODE.BAD_REQUEST).send({
            message: error.message
        });
    }

    newUser.email = newUser.email.toLowerCase();
    newUser.password = bcrypt.hashSync(newUser.password, 10);

    try {
        existentUser = await authRepository.getUserByEmail(newUser.email);
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    if (existentUser.rowCount > 0) {
        return res.status(STATUS_CODE.CONFLICT).send("email already registered");
    }
    try {
        await authRepository.insertUser(newUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    return res.sendStatus(STATUS_CODE.CREATED);
};

const signIn = async (req: Request, res: Response) => {
    const user = req.body as UserSignIn;
    let existentUser: QueryResult<UserEntity>;
    const { error } = SignInSchema.validate(user);

    if (error) {
        return res.status(STATUS_CODE.BAD_REQUEST).send({
            message: error.message
        });
    }

    try {
        existentUser = await authRepository.getUserByEmail(user.email);
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    if (existentUser.rowCount === 0) {
        return res.status(STATUS_CODE.UNAUTHORIZED).send("wrong email or password");
    }

    if (!await bcrypt.compare(user.password, existentUser.rows[0].password)) {
        return res.status(STATUS_CODE.UNAUTHORIZED).send("wrong email or password");
    }

    const token: string = jwt.sign({ userId: existentUser.rows[0].id }, process.env.TOKEN_SECRET);

    return res.status(STATUS_CODE.OK).send({ token });
};

export {
    signUp,
    signIn,
};