
import { Router } from "express";
import {LoginUser,SignupUser,VerifyUser,meUser,LogoutUser,ResendOtp,DeleteAll} from "../controller/user.js";
import {Auth} from "../middleware/Auth.js";

const route=Router()
route.post("/signup",SignupUser)
route.post("/login",LoginUser)
route.post("/verify",Auth,VerifyUser)
route.get("/me", Auth,meUser)
route.post("/logout",Auth,LogoutUser)
route.post("/resend",Auth,ResendOtp)
route.delete("/delete",DeleteAll)
export default route;
