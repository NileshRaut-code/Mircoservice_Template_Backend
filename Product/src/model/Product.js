import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        require:[true,"The Name is required"]
    },
    email:{
        type:String,
        unique:true,
        require:[true,"The Email is required"]



    },password:{
        type:String,
        require:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isCodeVerified:{
        type:Number,
        
    }
})

// userSchema.pre("save",async function(next){
//     if(!this.isModified("password")) return next();
//     this.password=await bcrypt.hash(this.password,10);
//     next()
// })


userSchema.pre("save",async function(next){
    if (!this.isModified("password")) return next();
// console.log(this.password);

  this.password =await bcrypt.hash(this.password, 10);
  console.log(this.password);
  
  next();
})

userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password, this.password);
  };

userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
    },"asdasdasd",{expiresIn:"1d"})
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
    },"asdasdasd",{expiresIn:"1h"})
}


export const User=mongoose.model("User",userSchema)





