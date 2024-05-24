const express=require("express");
const UserController=require("../../controllers/user-controller");

// Creating a new router object and storing in router
const router=express.Router();

router.post("/signup",UserController.create);

module.exports=router;