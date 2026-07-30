const express = require('express');
const {restrictTo} = require('../middleware/authMiddleware');

const router = express.Router();

router.get("/",restrictTo(["NORMAL","ADMIN"]),(req,res) => {
    return res.status(200).render("home",{
         user: req.user,
    });
})

router.get("/signup",(req,res) =>{
    return res.status(200).render("signup");
})
router.get("/login",(req,res) =>{
    return res.status(200).render("login");
})

router.get("/admin",restrictTo(["ADMIN"]),(req,res)=>{
    return res.status(200).render("admin",{
        user: req.user
    });
})


module.exports = router;