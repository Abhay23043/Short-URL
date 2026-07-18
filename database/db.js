const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('database connected successfully');
    
    }
    catch(err){
        console.error('database not connected');
    }
}

module.exports = connectDB