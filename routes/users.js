var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var router = express.Router();
const uri = "mongodb+srv://pmib-user:pmib-user@cluster0.ululh.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get("/osnovniPodatki", async (req, res) => {
  client.connect(err => {
    if (err) return console.error(err)
    const collection = client.db("captcha").collection("uporabniki");
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
router.post("/osnovniPodatki", async (req, res) => {
  client.connect(err => {
    if (err) return console.error(err)
    const collection = client.db("captcha").collection("uporabniki");
    collection.count({ _id: req.body._id })
      .then(result => {
        if (result > 0) {
          collection.replaceOne({ _id: req.body._id }, req.body)
            .then(result => {
              console.log(result);
              res.json(result);
              client.close();
            })
            .catch(error => {
              console.error(error);
              client.close();
            });
        }
        else {
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
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500);
        return;

      })
  });
});

module.exports = router;
