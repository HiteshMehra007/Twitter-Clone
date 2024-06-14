import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema({
    description : {
        type: String,
        required: true
    },
    like : {
        type: Array,
        default: []
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    bookmarks: {
        type: Array,
        default: []
    }
}, {timestamps: true});

export const Tweet = mongoose.model("Tweet", tweetSchema);