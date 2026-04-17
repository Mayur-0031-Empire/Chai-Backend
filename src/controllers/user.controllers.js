import {asyncHandler} from "../utils/asyncHandler.js";

const registerUser = asyncHandler(
    async (req, res) => {
        return res.status(512).json({
            message : "big acchivment for humanity"
        })
    }
);

export {registerUser};