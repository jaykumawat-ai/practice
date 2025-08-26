import mongoose, { Schema } from 'mongoose';


const postschema = new Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        unique: true,
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        require: true,
    },
    postImage: {
        type: String,
        default: "https://cdn.wallpapersafari.com/51/76/3TFfqI.jpg",
    },
    slug: {
        type: String,
        require: true,
        unique: true,
    }
}, { timestamps: true })

const Post = mongoose.model('post', postschema);

export default Post;