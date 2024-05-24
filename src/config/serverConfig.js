const dotenv=require("dotenv");
dotenv.config();
// The above line of code will call all variables of the .env file

module.exports={
    PORT:process.env.PORT
}