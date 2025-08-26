import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js"
import bcrypt, { truncates } from "bcryptjs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const updateDetails = async (req, res) => {
    //logic

    try {
        const { userName, email } = req.body
        if (!userName || !email) {
            throw new ApiError(400, "all fields are required")
        }
        const updateuser = await User.findByIdAndUpdate(
            req.User?._id,
            {
                $set: {
                    userName: userName.trim(),
                    email: email.trim()
                }
            },
            { new: true }
        )

        if (!updateuser) {
            throw new ApiError(400, "User updation process failed")
        }

        const user = await updateuser.save();
        return res.status(200)
            .json(new ApiResponse(200, user, "User updated successfully"))












    } catch (error) {
        throw new ApiError(400, error.message)
    }
}

const updateUserImage = async (req, res) => {
    //logic
    try {


        const userImagePath = req.file?.path;
        if (!userImagePath) {
            throw new ApiError(400, "userImage path not found");
        }

        const userImage = await uploadOnCloudinary(userImagePath);
        if (!userImage) {
            throw new ApiError(400, "userImage from cloudinary not found")
        }

        const user=await User.findByIdAndUpdate(
            req.user?._id,
            {
                userImage: userImage.url
            },
            { new: true }
        ).select(" -password")
        if(!user){
            throw new ApiError(400,"userImage process failed")
        }
        
        return res.status(200)
        .json(
            new ApiResponse(200,user,"userImage updated successfully")
        );




    } catch (error) {
        throw new ApiError(400, error.message);

    }


}

const changepassword = async (req, res) => {
    //logic
    try {
        const { oldPass, newpass } = req.body;
        if (!oldPass || !newpass) {
            throw new ApiError(400, "All fields are required ");

        }
        const user = await User.findById(req.user?._id)
        if (!user) {
            throw new ApiError(400, "invalid  details");

        }

        const compass = bcrypt.compareSync(oldPass, user.password)
        if (!compass) {
            throw new ApiError(400, "password not match");

        }

        const hashedPassword = bcrypt.hashSync(newpass, 10)

        user.password = hashedPassword;

        await user.save();

        return res.status(200)
            .json(200, {}, "password changed successfully")






    } catch (error) {
        throw new ApiError(400, error.message)
    }







}

const deleteUser = async (req, res) => {
    //logic
    try {
        await User.findByIdAndDelete(req.user?._id, { new: true })

        const Options = {
            httpOnly: true,
            secure: false
        }

        return res.status(200)
            .clearCookie("accessToken", Options)
            .json(new ApiResponse(200, {}, "user deleted successfully"))












    } catch (error) {
        throw new ApiError(400, error.message)
    }
}

export { updateDetails, updateUserImage, changepassword, deleteUser }