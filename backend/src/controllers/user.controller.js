import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;

    // Basic Validation
    if(
        [ name, email, password, username ].some((field) => 
        field?.trim() === "")
    ){
        return res.status(401).json({
            message: "All name fields are required !!",
            sucess: false
        })
    }
    // if(!name){
    //     return res.status(401).json({
    //         message: "All name fields are required !!",
    //         sucess: false
    //     })
    // }

    const existedUser = await User.findOne({ email });
    if(existedUser){
        return res.status(401).json({
            message: "User already exist with similar email !",
            sucess: false
        })
    }
    
    const lowerCaseUsername = username.toLowerCase();

    const user = await User.create({
        name,
        username: lowerCaseUsername,
        password,
        email,
    })

    const createdUser = await User.findById(user._id).select("-password");

    if(!createdUser){
        res.status(500).json({
            message: "Something went wrong while registering the user !",
            sucess: false
        })
    }

    return res.status(200).json({
        createdUser,
        message: "User Registered Succesfully !!",
        sucess: true
    })
}

export { registerUser };