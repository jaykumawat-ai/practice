import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Comment from "../models/comment.js"
import Post from "../models/post.js";


const createComment = async (req, res) => {
    try {
        const { content, postId } = req.body;

        if (!content || !postId) {
            throw new ApiError(400, "Content and Post ID are required");
        }

        const comment = await Comment.create({
            content,
            userId: req.user._id,
            postId
        });

        return res.status(201).json(
            new ApiResponse(201, comment, "Comment created successfully")
        );

    } catch (error) {
        (new ApiError(400, error.message));
    }
};


const getComment = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) {
            throw new ApiError(400, "Post ID is required");
        }

        const post = await Post.findById(postId);

        if(!post){
            throw new ApiError(404, "post not found");
        }

        const comments = await Comment.find(postId)
            .populate("userId", "username email")
            .sort({ createdAt: -1 });
            
        console.log(comments);
        
        return res.status(200).json(
            new ApiResponse(200, comments, "Comments fetched successfully")
        );
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};





const deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        if (!commentId) {
            return next(new ApiError(400, "commentId is required"));
        }

        // Find the comment
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return next(new ApiError(404, "Comment not found"));
        }

        // Check if the user deleting the comment is the owner
        if (comment.userID.toString() !== req.user?._id.toString()) {
            return next(new ApiError(403, "You are not allowed to delete this comment"));
        }

        // Delete the comment
        await Comment.findByIdAndDelete(commentId);

        return res.status(200).json(
            new ApiResponse(200, {}, "Comment deleted successfully")
        );
    } catch (error) {
        next(new ApiError(500, error.message || "Failed to delete comment"));
    }
};


export { deleteComment, getComment, createComment }