const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    redirectURL:{
        type: String,
        required: true
    }
})

//model creation

const URL = mongoose.model('URL',urlSchema);

//export the model

module.exports = URL;