import { v2 as cloudinary } from 'cloudinary'
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: "aut0",
        });
        console.log("file upload successfully", Response.url)
        if(fs.existsSync(localFilePath)){
            fs.rmSync(localFilePath)
        }
    } catch (error) {
        console.log("error occur while uploading on cloudinary",error);
         if(fs.existsSync(localFilePath)){
            fs.rmSync(localFilePath)
         }
  
    }

};

export {uploadOnCloudinary};