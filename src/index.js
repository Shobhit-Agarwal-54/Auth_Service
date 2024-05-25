const express=require("express");
const bodyParser=require("body-parser");
const {PORT}=require("./config/serverConfig");
const apiRoutes=require("./routes/index");

// const UserService=require("./services/user-service");

const app=express();

const prepareAndStartServer=()=>{
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    // the above 2 lines of code will make the bodyParser read the request body
    
    app.use("/api",apiRoutes);
    
    app.listen(PORT,()=>{
        console.log(`Server Started on Port:${PORT}`);
        
    // Testing the JWT token creation and verification 
     // const service=new UserService();
    //    const newToken= service.createToken({
    //         email:"sanket@admin.com",
    //         id:1
    //     });
    //     console.log("New token is ",newToken);
    // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmtldEBhZG1pbi5jb20iLCJpZCI6MSwiaWF0IjoxNzE2NjM5MzY3LCJleHAiOjE3MTY2NDI5Njd9.NlKHxRGlmoM2IlOjBpPvnMFGlEnX9cROlVmWVbsVQNY"
    //    const response= service.verifyToken(token);
    //    console.log(response);

    })
}

prepareAndStartServer();