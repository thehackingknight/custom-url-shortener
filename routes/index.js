var express = require('express');
var router = express.Router();
var Url = require("../models/url");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Clickshorten' });
});

router.get('/:code', async(req, res) => {

    try {

        var url = await Url.findOne({ urlCode: req.params.code });

        if (url) {
            res.redirect(url["longUrl"]);
        } else {
            res.status(404).json('Url not found');
        }

    } catch (err) {
        console.error(err);
        res.status('500').json('Server error');
    }
})

module.exports = router;