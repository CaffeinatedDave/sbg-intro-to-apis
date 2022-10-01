var express = require('express'),
    router = express.Router();


var things = ["Apple", "Banana", "Carrot"]

router.get("/things", (req, res, next) => {
  res.json(things);
});

router.post("/things", (req, res, next) => {
  const body = req.body
  if (body.thing !== undefined) {
    things.push(body.thing)
    res.json(things);
  } else {
    res.status(400).send('Invalid Request')
  }
});

router.delete("/things", (req, res, next) => {
  const body = req.body
  if (body.thing !== undefined) {
    const result = things.filter(function(x) {
      return x !== body.thing;
    });
    things = result;
    res.json(things);
  } else {
    res.status(400).send('Invalid Request')
  }
});

module.exports = router;
