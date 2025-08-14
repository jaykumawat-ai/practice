import { ApiError } from "../utils/ApiError"
import User from "../models/user.model.js"
const verifyJWT = async (req, res, next) => {
    try {
        const tokenFromClient = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
        if (!tokenFromClient) {
            throw new ApiError(400, "token not found")
        }

        const decodedToken = jwt.verify(tokenFromClient, process.env.ACCESS_TOKEN_SECRET)
        if (!decodedToken) {
            throw new ApiError(400, "Invalid access token")
        }
        const user = User.findOne(decodedToken?._id).select(" -password")
        if (!user) {
            throw new ApiError(400, "invalid user")
        }

        req.user = user;
        next()


    } catch (error) {
        throw new ApiError(400, "something went wrong", error)
    }
}

export default verifyJWT