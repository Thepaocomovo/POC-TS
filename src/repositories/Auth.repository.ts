import { connection } from "../database/Postgres.js";
import { QueryResult } from "pg";
import {UserEntity, NewUserEntity} from "../protocols/User.types.js";

const getUserByEmail = (email: string): Promise<QueryResult<UserEntity>> => {
    return connection.query(`
        SELECT * 
        FROM users
        WHERE email = $1
    ;`, [email]);
};

const insertUser = (newUser: NewUserEntity) => {
    return connection.query(`
        INSERT INTO users
        (name, email, password)
        VALUES ($1, $2, $3)
    ;`, [newUser.name, newUser.email, newUser.password])
};

export {
    getUserByEmail,
    insertUser
};