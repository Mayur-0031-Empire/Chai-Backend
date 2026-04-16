import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`);

        console.log(`\n Connected to Database successfully !! DB HOST : ${connectionInstance.connection.host}`);

    }catch (error) {
        console.error('Error while connecting to Database', error);
        process.exit(1);
    }
}

export default connectDB;
