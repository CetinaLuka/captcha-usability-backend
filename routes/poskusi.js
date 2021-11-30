var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var router = express.Router();
const uri = "mongodb+srv://pmib-user:pmib-user@cluster0.ululh.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.get("/", async (req, res) => {
    client.connect(err => {
        if (err) return console.error(err)
        const collection = client.db("captcha").collection("poskusi");
        collection.find().toArray().then(results => {
            console.log(results);
            res.send(results);
            client.close();
        })
            .catch(error => {
                console.error(error);
                client.close();
            });
    });
});
router.post("/", async (req, res) => {
    console.log("inside method");
    client.connect(err => {
        
        if (err){ console.log(err); return console.error(err);}
        const collection = client.db("captcha").collection("poskusi");
        collection.insertOne(req.body)
            .then(result => {
                console.log(result);
                res.json(result);
                client.close();
            })
            .catch(error => {
                console.error(error);
                client.close();
            });
    })
});

module.exports = router;
