const express = require('express');
const app = express();
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const URL = require('./models/url');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectDB = require('./database/db');
const {
    handleRedirectToOriginalURL
} = require('./controllers/url');
 
// view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));// so we can get data from form in req.body
connectDB();

app.use("/url",urlRoute);

app.use("/",staticRoute);

app.get("/:shortId", handleRedirectToOriginalURL);


PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`);
})