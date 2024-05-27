const dotenv=require("dotenv");
const bcrypt=require("bcrypt");
dotenv.config();
// The above line of code will call all variables of the .env file

module.exports={
    PORT:process.env.PORT,
    SALT: bcrypt.genSaltSync(10),
    JWT_KEY:process.env.JWT_KEY,
    DB_SYNC:process.env.DB_SYNC
}