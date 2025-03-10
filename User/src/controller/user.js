import {User} from "../model/user.js"


function genotp() {
    return Math.floor(1000 + Math.random() * 9000); 
    
}


async function generatetoken(userid) {
    try {
        const data = await User.findById(userid);
        

        const accessToken = data.generateAccessToken();
        const refreshToken = data.generateRefreshToken();
        await data.save();
        return { accessToken, refreshToken };
    } catch (error) {
       
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

const SignupUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        if (!name || !email || !username || !password) {
            throw new Error("All Field Required");
        }

        const data = await User.findOne({ $or: [{ email }, { username }] });
        if (data) {
            throw new Error("The email or username is already present");
        }
        const otp=genotp()
        const currentuser = await User.create({
            name,
            email,
            username: username.toLowerCase(),
            password,
            isCodeVerified: otp
        });

        const user = await User.findById(currentuser._id).select("-password -refreshToken");
        const { accessToken, refreshToken } = await generatetoken(user._id);
        const cuser = await User.findById(currentuser._id);
        const options = {
            httpOnly: true,
            secure: false, // Set to false if not using HTTPS
            sameSite: "None"
        };
        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ user });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("All Field Required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("The Email or User name is not correct or user is not present");
        }

        const checkp = await user.isPasswordCorrect(password);
        if (!checkp) {
           // return res.status(403).json("The Password is Wrong");
           throw new Error("The Password is Wrong")
        }
        const cuser = await User.findById(user._id).select("-password -refreshToken");
        const { accessToken, refreshToken } = await generatetoken(user._id);
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "None"
        };
        return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json({cuser})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const VerifyUser = async (req, res) => {
    try {
        const { otp } = req.body;
        const { email } = req.user;

        const user = await User.findOne(email).select("-password -refreshToken");

        if (user.isCodeVerified == otp) {
            user.isCodeVerified = null;
            user.isVerified = true;
            await user.save();
            return res.status(200).json(["Otp verified Succesfully",{user}])
        }
        res.status(200).json("The wrong otp");
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const meUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id).select("-password -refreshToken");;
        const { accessToken, refreshToken } = await generatetoken(user._id);
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "None"
        };
        return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json({user})

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const ResendOtp = async (req, res) => {
    try {
        const { email } = req.user;
        
        const user = await User.findOne({ email }).select("-password -refreshToken");;
        
        
        if (user.isVerified) {
            return res.status(400).json("User is already verified");
        } else {
            const otp = genotp();
            user.isCodeVerified = otp;
            await user.save();
            return res.status(200).json("OTP resent successfully");
            
        }
    } 
     catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const LogoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
              $unset: {
                refreshToken: 1,
              },
            },
            {
              new: true,
            }
          );
        
          const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          };
        
          return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                success: true,
                message: "User logged out successfully"
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const DeleteAll = async (req, res) => {
    try {
        await User.deleteMany({});
        return res.status(200).json({
            success: true,
            message: "All users deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export { LoginUser, SignupUser, VerifyUser, meUser, LogoutUser, ResendOtp,DeleteAll };