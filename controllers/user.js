// const express = require('express');

const User = require('../models/user');
const { setUser } = require('../service/auth');

//creating session id
const {v4: uuidv4} = require('uuid');

async function handleUserSignup(req,res){
    const { name,email,password } =req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.status(201).redirect("/");
}

async function handleUserLogin(req,res){
    const { email,password } = req.body;
    const user = await User.findOne({ email, password });
    if(!user) return res.status(404).render("login").send({error: 'Invalid Id and Password'});

    const token = setUser(user);
    res.cookie('uid',token);
    return res.status(200).redirect("/").send({ message: 'Login successful' });
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}
