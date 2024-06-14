import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name : {
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
        required: true
    }
}, { timestamps: true})

export const User = mongoose.model("User", userSchema);