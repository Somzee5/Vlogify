// backend apis


const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB!!!');
    }).catch((err) => {
        console.log(err);
}); 



app.listen(3000, () => {
    console.log("Server is running at 3000 !!");
});


