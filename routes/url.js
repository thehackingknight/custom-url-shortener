const express = require('express');
const router = express.Router();
const validUrl = require('valid-url'),
    shortId = require('shortid'),
    config = require('config'),
    Url = require('../models/url')

// @route POST /api/url/shorten
// @desc    Create short URL

router.post('/shorten', async(req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base Url');
    }

    // Create Url code
    const urlCode = shortId.generate();

    // Validate long url

    if (validUrl.isUri(longUrl)) {

        try {
            let url = await Url.findOne({ longUrl });
            if (url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()

                })

                await url.save();

                res.json(url);
            }


        } catch (e) {
            console.error(e);
            res.status(500).json('Server error!')
        }
    } else {
        res.status(401).json('Invalid long url');
    }
})
module.exports = router;