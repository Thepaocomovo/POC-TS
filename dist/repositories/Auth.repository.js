import { connection } from "../database/Postgres.js";
var getUserByEmail = function (email) {
    return connection.query("\n        SELECT * \n        FROM users\n        WHERE email = $1\n    ;", [email]);
};
var insertUser = function (newUser) {
    return connection.query("\n        INSERT INTO users\n        (name, email, password)\n        VALUES ($1, $2, $3)\n    ;", [newUser.name, newUser.email, newUser.password]);
};
export { getUserByEmail, insertUser };
