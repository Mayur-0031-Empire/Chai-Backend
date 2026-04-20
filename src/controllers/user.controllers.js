import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(
    async (req, res) => {
        // get details of users from frontend
        // validate the details check impotant fields are present or not
        // chcek the current user is alrealy is present or not
        // check any images are also their are not like avatar or profile pic 
        // if not theen create a new user in database
        // 
        const { fullname, username, email, password } = req.body;
        // console.log("email : ", email);
        // console.log("fullname : ", fullname);
        // console.log("username : ", username);
        // console.log("password : ", password);
        console.log("body : ", req.body);

        if ([fullname, username, email, password].some((field) => { field?.trim() === "" })) {
            throw new ApiError(400, "All fields are required");
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            throw new ApiError(409, "User with this username or email already exists");
        }

        const avatarLocalPath = req.files?.avatar[0]?.path;
        const coverImageLocalPath = req.files?.coverimage[0]?.path;

        if (!avatarLocalPath || !coverImageLocalPath) {
            throw new ApiError(400, "Avatar and cover image are required");
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        const coverimage = await uploadOnCloudinary(coverImageLocalPath);

        if (!avatar || !coverimage) {
            throw new ApiError(400, "Failed to upload images to cloudinary");
        }

        const user = await User.create({
            fullname,
            username : username.toLowerCase(),
            email,
            password,
            avatar: avatar.url,
            coverimage: coverimage.url,
        });

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken -watchhistory"
        );

        if (!createdUser) {
            throw new ApiError(500, "Failed to create user");
        }

        return res.status(201).json(
            new ApiResponse(201, "User registered successfully", createdUser)
        );
    }

);

export { registerUser };