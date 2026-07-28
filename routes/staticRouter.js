const express = require('express');

const router = express.Router();

router.get("/",(req,res) => {
    return res.status(200).render("home");
})

router.get("/signup",(req,res) =>{
    return res.status(200).render("signup");
})
router.get("/login",(req,res) =>{
    return res.status(200).render("login");
})



module.exports = router;