import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullName : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    profileImg: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    }
}, { timestamps: true})

export const User = mongoose.model("User", userSchema);