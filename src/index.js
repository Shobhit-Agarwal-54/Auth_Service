const express=require("express");
const bodyParser=require("body-parser");
const {PORT}=require("./config/serverConfig");
const apiRoutes=require("./routes/index");
const db=require("./models/index");
const {User,Role}=require("./models/index");

// const UserService=require("./services/user-service");

const app=express();

const prepareAndStartServer=()=>{
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    // the above 2 lines of code will make the bodyParser read the request body
    
    app.use("/api",apiRoutes);
    
    app.listen(PORT,async ()=>{
        console.log(`Server Started on Port:${PORT}`);
    });
}
prepareAndStartServer();

        // All codes should be inside the app.listen().
        // const u1=await User.findByPk(2);
        // const r1=await Role.findByPk(2);
        // u1.addRole(r1);
        // The above line of code will insert into the combined table the id's of 
        // both the user object and the role object

        // const response=await u1.getRoles();
        // console.log(response);

        // const response=await u1.hasRole(r1);
        // console.log(response);

    // if(process.env.DB_SYNC){
    //  db.sequelize.sync({alter:true});
    // Syncing the db if there is DB_SYNC variable in .env
    // No need to require dotenv in index file in order to access the .env variables
    // Simply use global object process

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
