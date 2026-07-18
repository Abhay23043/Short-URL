const shortid = require('shortid');
const url = require('../models/url');

async function handleGenerateNewShortURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).send({error : 'url is required'});

    const shortID = shortid.generate();

    await url.create({
        shortId :shortID,
        redirectURL: body.url,
    })
    return res.render('home',{ id:shortID });
    // return res.json({ id:shortID }   
}

async function handleRedirectToOriginalURL(req,res){
  
    const shortID = req.params.shortId; // Get the short ID from the request parameters
    try{
        const entry = await url.findOne({ shortId: shortID });

        if(!entry) return res.status(404).send({error: 'Short URL not found'});

        return res.redirect(entry.redirectURL);
    }

    

    catch(err){
        console.error(err);
        return res.status(500).send({error: 'Internal Server Error'});
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectToOriginalURL
}