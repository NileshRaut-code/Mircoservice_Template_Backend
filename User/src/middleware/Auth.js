// import jwt from "jsonwebtoken";


// const  Auth =async(req,res,next)=>{
//     try {
//         const token=req.cookies?.accessToken || req.header("Authorizatoin")?.replace("Bearer ","");

//         if(!token){
//             throw new Error("User Is not Auhtorized")
//         }

//         const user=await jwt.verify(token,"asdasdasd");
//         req.user=user;
//         next();
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: error.message
//         });
//     }
// }

// export default Auth














import jwt from "jsonwebtoken"
import { User } from "../model/user.js"

const Auth =async(req,res,next)=>{
try {
    const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    if(!token) throw new Error("The Token are Not Valid")

    const user= jwt.verify(token,"asdasdasd")

    const AuthUser=await User.findById(user._id)
    req.user=AuthUser
    next()
} catch (error) {
    console.log(error);
    res.status(500).json({
        succes:false,
        message:error.message,
        error:error.message
    })

    
}
}

export {Auth}















