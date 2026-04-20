import express from "express";
import { registerUser } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js";

const userRouter = express.Router();
userRouter.post("/register", 
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "coverimage",
            maxCount : 1
        }
    ]),
    registerUser);

export  {userRouter};