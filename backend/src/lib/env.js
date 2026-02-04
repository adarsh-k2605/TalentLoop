import dotenv from "dotenv"

dotenv.config({quiet:true});

export const ENV = {
    PROT : process.env.PORT,
    DB_URL : process.env.DB_URL,
};