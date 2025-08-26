import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Post from "../models/post.js"

const createPost = async (req, res) => {


    try {
        const { title, content } = req.body;

        if (!title || !content) {
            throw new ApiError(400, "All fields are required")
        }

        const postImagePath = req.file?.path;
        if (!postImagePath) {
            throw new ApiError(400, "post image path not found")
        }

        const postImage = await uploadOnCloudinary(postImagePath)

        if (!postImage) {
            throw new ApiError(400, "postimage from cloudinary not found")
        }

        const slug = req.body.title
            .split(" ")
            .join("-")
            .toLowerCase()
            .replace(/[^a-zA-Z0-9-]/g, "");

        const post = await Post.create({
            title,
            content,
            postImage: postImage.url,
            userID: req.user._id,
            slug
        })
        if (!post) {
            throw new ApiError(400, "post creation process failed")
        }
        return res.status(201)
            .json(
                new ApiResponse(201, post, "post created successfully")
            )







    } catch (error) {
        throw new ApiError(400, error.message)

    }
}


const deletePost = async (req, res) => {

    try {
        const postId = req.params.postId;
        if (!postId) {
            throw new ApiError(404, "postId not found");
        }

        const post = await Post.findById(postId);

        if (!post) {
            throw new ApiError(404, "post not found");
        }

        if (post.userID.toString() !== req.user?._id.toString()) {
            throw new ApiError(400, "you are not allowed to delete post")
        }

        await Post.findByIdAndDelete(postId)

        return res.status(200)
            .status(200)
            .json(new ApiResponse(200, {}, "post deleted successfully"));

    } catch (error) {
        throw new ApiError(400, error.message)

    }

}



const getALLPost = async (req, res) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;


    const allPosts = await Post.find()
    .sort({ updatedAt : sortDirection})
    .skip(startIndex)
    .limit(limit)

    if(!allPosts){
      throw new ApiError(404, "Posts not found");
    }

    const totalPosts = await Post.countDocuments();

    return res.status(200)
    .json(
      new ApiResponse(
        200,
        {
          allPosts,
          totalPosts
        },
        "Posts are fetched successfully"
      )
    )
       
    } catch (error) {
        throw new ApiError (400,error.message)
    }


}

const getPostById = async (req, res) => {
    try {
        const postId = req.params.postId;
        if (!postId) {
            throw new ApiError(404, "postId not found");
        }
        const post = await Post.findById(postId);

        if (!post) {
            throw new ApiError(404, "post not found");
        }

        return res.status(200)
        .json(new ApiResponse(200, post, "required post is fetched successfully"));


    } catch (error) {
        throw new ApiError(400, error.message)
    }


}

export { createPost, deletePost, getALLPost, getPostById }


