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

var stats = {
  rolls: 0,
  total: 0,
}

router.get("/random/:number", (req, res, next) => {
  if (parseInt(req.params.number) >= 4) {
    stats.rolls += 1
    stats.total += 4
    res.send("4"); // chosen by fair dice roll. https://xkcd.com/221/
  } else {
    res.status(400)
    res.send("number must be greater than 4")
  }

})

module.exports = router;
