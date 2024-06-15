import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../lib/util/generateToken.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
    try{
        const { fullName , username, email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error: "Invalid email format"});
        }

        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(400).json({ error: "Username already exist"});
        }

        const existingEmail = await User.findOne({ email });
        if(existingEmail){
            return res.status(400).json({ error: "Email already exist"});
        }

        if(password.length < 6){
            return res.status(400).json({ error: "Password must be at least 6 character long !"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            email,
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            return res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                username: newUser.username,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
				coverImg: newUser.coverImg,
            });
        }
        else{
            return res.status(400).json({ error: "Invalid user data" });
        }

    }
    catch(error){
        console.log("Something went wrong while registering user !\n", error.message);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const loginUser = async (req, res) => {
    try{
        const { username, password } = req.body;
        
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        });
    }
    catch(error){
        console.log("Something went wrong while login user !\n", error.message);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const logoutUser =  async (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge: 0});
        return res.status(200).json({message: "Logged out successfully "});
    }
    catch(error){
        console.log("Something went wrong while logout user !\n", error.message);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select("-password");
		return res.status(200).json(user);
    }
    catch(error){
        console.log("Something went wrong while getting user in User controller !\n", error.message);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export { registerUser, loginUser, logoutUser, getMe };