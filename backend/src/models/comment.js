import mongoose, { Schema } from 'mongoose';


const commentschema = new Schema({
    content: {
        type: String,
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        require: true,
    },
    postid: {
        type: mongoose.Types.ObjectId,
        ref: "post",
        require: true,
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        ref: "user",
        default: [],
    },

}, { timestamps: true })

const Comment = mongoose.model('Comment', commentschema);

export default Comment;