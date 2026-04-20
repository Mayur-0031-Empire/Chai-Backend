import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filepath) => {
    try {
        if(!filepath){
            throw new Error("File path is required for uploading to cloudinary");
        }
        // upload the file to cloudinary
        const response = await cloudinary.uploader.upload(filepath, {
            resource_type : "auto",
        });
        console.log("File uploaded to cloudinary successfully", response.url);
        return response;
    }
    catch(error){
        fs.unlinkSync(filepath);
        // remove the localy saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary};