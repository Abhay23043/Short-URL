// const sessionIdtoUserMap = new Map(); no need now creating tokens
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function setUser(user){
    return jwt.sign({
        _id:user.id,
        email:user.email,
    },process.env.SECRET);
}
function getUser(token){
    if(!token) return null;
    return jwt.verify(token, process.env.SECRET);
} 

module.exports = {
    setUser,
    getUser
}