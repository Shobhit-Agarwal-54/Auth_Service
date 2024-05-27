const express=require("express");
const UserController=require("../../controllers/user-controller");
const {AuthRequestValidators}=require("../../middlewares/index");

// Creating a new router object and storing in router
const router=express.Router();

router.post(
    "/signup",
    AuthRequestValidators.validateUserAuth,
    UserController.create);

router.post(
    "/signin",
    AuthRequestValidators.validateUserAuth,
    UserController.signIn);

router.get(
    "/isAuthenticated",
    UserController.isAuthenticated
)
router.get("/isAdmin",
    AuthRequestValidators.validateIsAdminRequest,
    UserController.isAdmin
)

module.exports=router;
