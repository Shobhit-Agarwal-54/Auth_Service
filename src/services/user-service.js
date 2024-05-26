const UserRepository=require("../repository/user-repository");
const jwt=require("jsonwebtoken");
const {JWT_KEY}=require("../config/serverConfig");
const bcrypt=require("bcrypt");

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

    async signIn(email,plainPassword){
        try {
            // step 1-> fetch the user using the email
            const user=await this.userRepository.getByEmail(email);
            // step 2 -> compare incoming plain password with stored encrypted password
            const passwordMatch=this.checkPassword(plainPassword,user.password);
            
            if(!passwordMatch)
                {
                    console.log("Password doesn't match");
                    throw {error:"Incorrect Password"};
                }
            // step-3 -> if password match then create a token and send it to the user
            const newJWT=this.createToken({email:user.email,id:user.id});
            return newJWT;
            // Same class functions are also to be called using the object of the class

        } catch (error) {
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }

    async isAuthenticated(token)
    {
        try {
           const response= this.verifyToken(token);
        //    We are finding out the object contained inside the token
           if(!response)
            {
                throw {error:"Invalid token"}
                // Token expired
            }
            // We are fetching the user details pointed out by token from database
            const user=await this.userRepository.getById(response.id);
            if(!user)
            {
                throw {error:"No user with corresponding token exists"};
                // It means that the user had signed in and after that deleted the account
            }
            return user.id;
        } catch (error) {
         console.log("Something went wrong in the auth process");
         throw error;   
        }
    }

    createToken(user)
    {
        // here user should be a custom js object not an sequelize object
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

    checkPassword(userInputPlainPassword,encryptedPassword)
    {
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }
}

module.exports=UserService;