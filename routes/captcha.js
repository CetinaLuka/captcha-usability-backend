var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var sliderCaptcha = require('@slider-captcha/core');
const uri = "mongodb+srv://pmib-user:pmib-user@cluster0.ululh.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/slide/create', function (req, res) {
    sliderCaptcha.create()
        .then(function ({ data, solution }) {
            res.json({data: data, solution: solution});
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
});

router.get('/slide/createe', function (req, res) {
    res.json({ test: "test" });
});

module.exports = router;