const express = require('express');
const { handleGenerateNewShortURL } = require('../controllers/url');
const { handleRedirectToOriginalURL } = require('../controllers/url');
const router = express.Router();

router.post("/",handleGenerateNewShortURL);

router.get("/:shortId",handleRedirectToOriginalURL);

module.exports = router;