import { User } from "../models/user.model.js";
import { Notification } from "../models/notification.model.js";
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

const getUserProfile = async (req, res) => {
    try{
        const { username } = req.params;

        const user = await User.findOne({ username }).select('-password');
        if(!user) return res.status(200).json({error: "User not found"});

        return res.status(400).json(user);
    }
    catch(error){
        console.log("Something went wrong while getting user profile !", error.message);
        return res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

const followUnfollowUser = async (req, res) => {
    try{
        const {id} = req.params;

        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()) return res.status(400).json({error: "You can't follow/unfollow yourself"});

        if(!userToModify || !currentUser) return res.status(400).json({error: "User not found"});

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            // Unfollow the user
            await User.findByIdAndUpdate(id, { $pull: {followers: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, { $pull: {following: id}});
            
            // TODO : return the id of user in response
            return res.status(200).json("User unfollowed successfully !");
        }
        else{
            // follow the user
            await User.findByIdAndUpdate(id, { $push: {followers: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, { $push: {following: id}});

            // send notification
            const newNotification = new Notification({
                type: "follow",
                from: currentUser._id,
                to: userToModify._id,
            })

            await newNotification.save();
            // TODO : return the id of user in response
            return res.status(200).json({message: "User followed successfully"});
        }
    }
    catch(error){
        console.log("Something went wrong while followUnfollowUser !", error.message);
        return res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

const getSuggestedUsers = async (req, res) => {
	try {
		const userId = req.user._id;

		const usersFollowedByMe = await User.findById(userId).select("following");

		const users = await User.aggregate([
			{
				$match: {
					_id: { $ne: userId },
				},
			},
			{ $sample: { size: 10 } },
		]);

		const filteredUsers = users.filter((user) => !usersFollowedByMe.following.includes(user._id));
		const suggestedUsers = filteredUsers.slice(0, 4);

		suggestedUsers.forEach((user) => (user.password = null));

		res.status(200).json(suggestedUsers);
	} catch (error) {
		console.log("Error in getSuggestedUsers: ", error.message);
		res.status(500).json({ error: error.message });
	}
};

const updateUser = async (req, res) => {
	const { fullName, email, username, currentPassword, newPassword, bio, link } = req.body;
	let { profileImg, coverImg } = req.body;

	const userId = req.user._id;

	try {
		let user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
			return res.status(400).json({ error: "Please provide both current password and new password" });
		}

		if (currentPassword && newPassword) {
			const isMatch = await bcrypt.compare(currentPassword, user.password);
			if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });
			if (newPassword.length < 6) {
				return res.status(400).json({ error: "Password must be at least 6 characters long" });
			}

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(newPassword, salt);
		}

		if (profileImg) {
			if (user.profileImg) {
				await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(profileImg);
			profileImg = uploadedResponse.secure_url;
		}

		if (coverImg) {
			if (user.coverImg) {
				await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(coverImg);
			coverImg = uploadedResponse.secure_url;
		}

		user.fullName = fullName || user.fullName;
		user.email = email || user.email;
		user.username = username || user.username;
		user.bio = bio || user.bio;
		user.link = link || user.link;
		user.profileImg = profileImg || user.profileImg;
		user.coverImg = coverImg || user.coverImg;

		user = await user.save();

		// password should be null in response
		user.password = null;

		return res.status(200).json(user);
	} catch (error) {
		console.log("Error in updateUser: ", error.message);
		res.status(500).json({ error: error.message });
	}
};

export { registerUser, loginUser, logoutUser, getMe, getUserProfile, getSuggestedUsers, followUnfollowUser, updateUser };