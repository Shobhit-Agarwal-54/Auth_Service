const UserRepository=require("../repository/user-repository");
const jwt=require("jsonwebtoken");
const {JWT_KEY}=require("../config/serverConfig");

class UserService{
    constructor()
    {
       this.userRepository= new UserRepository();
    }

    async create(data)
    {
        try {
            const user=await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }
    createToken(user)
    {
        try {   
            // JWT_KEY is a key that is unique for each token creation and is specified by us
        const result= jwt.sign(user,JWT_KEY,
            {expiresIn:"1h"}
        );
        return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token)
    {
        try {
           const response= jwt.verify(token,JWT_KEY);
        // The above line of code will give us the object which was contained inside the token
        // That is the user object which led to creation of token in the first place
           return response;
        } catch (error) {
            console.log("Something went wrong in token validation",error);
            throw error;
        }
    }
}

module.exports=UserService;