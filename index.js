const express = require('express');
const app = express();
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
const { rectricttoLoginUserOnly } = require('./middleware/authMiddleware');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const cookieParser = require('cookie-parser')
// view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));// so we can get data from form in req.body
connectDB();
app.use(cookieParser());

app.use("/url", rectricttoLoginUserOnly, urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);

app.get("/url/:shortId", handleRedirectToOriginalURL);


PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`);
})