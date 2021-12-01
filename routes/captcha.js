var express = require('express');
var router = express.Router();
var sliderCaptcha = require('@slider-captcha/core');

router.get('/slide/create', function (req, res) {
    sliderCaptcha.create()
        .then(function ({ data, solution }) {
            console.log(data);
            req.session.captcha = solution;
            req.session.save();
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
});

router.get('/slide/createe', function (req, res) {
    res.json({ test: "test" });
});

router.post('/slide/verify', function (req, res) {
    sliderCaptcha.verify(req.session.captcha, req.body)
        .then(function (verification) {
            if (verification.result === 'success') {
                req.session.token = verification.token;
                req.session.save();
            }
            res.status(200).send(verification);
        });
});

module.exports = router;