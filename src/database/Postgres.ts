import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
 
const connection = new Pool({
    host: "localhost",
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.PASSWORD,
    database:  process.env.DATABASE
});

export { connection };