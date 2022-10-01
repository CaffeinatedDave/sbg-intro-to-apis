var express = require('express'),
    router = express.Router();

router.get("/hello", (req, res, next) => {
  var name = ((req.query.name != undefined) ? req.query.name : 'World');
  res.send("Hello, " + name + "!")
})

router.post("/echo", (req, res, next) => {
  res.send(req.body);
})

router.get("/random", (req, res, next) => {
  res.redirect('/intro/random/6');
})

var stats = {}

function statsUpdate(n, r) {
  if (stats[n] == undefined) {
    stats[n] = {rolls: 0, total: 0, average: 0}
  }
  stats[n].rolls += 1
  stats[n].total += r
  stats[n].average = (stats[n].total * 1.0) / stats[n].rolls
}

router.get("/random/:number", (req, res, next) => {
  if (req.params.number == "stats") {
    res.json(stats)
  } else {
    var number = parseInt(req.params.number)
    if (number >= 4) {
      var result = 4 // chosen by fair dice roll. https://xkcd.com/221/
      statsUpdate(number, result)
      res.send(result + "");
    } else {
      res.status(400)
      res.send("number must be greater than 4")
    }
  }
})

module.exports = router;
