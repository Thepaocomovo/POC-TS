import bcrypt from "bcrypt";
import { STATUS_CODE } from "../enuns/StatusCodes.js";
import { Request, Response } from "express";
import { newUserSchema } from "../schemas/UserSchemas.js";

type user = {
	name: string,
    email: string,
    password: string
};

const signUp = (req: Request, res: Response) => {
    if (!req.body) return res.status(STATUS_CODE.BAD_REQUEST).send("body is missing");
    const newUser = req.body as user;
   
    const { error } = newUserSchema.validate(newUser)

    if(error) {
        return res.status(STATUS_CODE.BAD_REQUEST).send({message: error.message});
    }


    console.log(newUser)

    newUser.email = newUser.email.toLowerCase();
    
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    console.log(newUser)

    // let user;
    // let userId;

    // try {
    //     user = await authRepository.insertUser({ name, email, hashPassword });
    //     userId = user.rows[0].id;

    // } catch (error) {
    //     if (error.code === "23505") {
    //         console.log("error", error.code, "handled");
    //         return res.sendStatus(STATUS_CODE.CONFLICT);
    //     }
    //     console.log(error);
    //     return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    // }

    // try {
    //     await authRepository.insertUserPicture({ userPicture, userId });
    // } catch (error) {
    //     console.log(error);
    //     return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    // }

    return res.sendStatus(STATUS_CODE.CREATED);
}


export {
    signUp,
}