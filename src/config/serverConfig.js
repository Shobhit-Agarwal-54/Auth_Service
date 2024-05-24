const dotenv=require("dotenv");
const bcrypt=require("bcrypt");
dotenv.config();
// The above line of code will call all variables of the .env file

module.exports={
    PORT:process.env.PORT,
    SALT: bcrypt.genSaltSync(10)
}