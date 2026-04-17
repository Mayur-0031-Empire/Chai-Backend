import dotenv from 'dotenv';
dotenv.config({ 
    path: './.env'
});

import {app} from "./app.js";
// console.log("ENV CHECK:", process.env.DATABASE_URI);

// require('dotenv').config({ path: './.env' });
import {connectDB} from './db/index.js';


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})

.catch((error) => {
    console.error('Error while connecting to Database', error);
})





























/*
import express from "express";
const app = express();
;( async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)

        app.on('error', (error) => {
            console.error('Error while connecting to server', error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })

    }catch (error) {
        console.error('Error while connecting to Database', error);
    }
})()

*/