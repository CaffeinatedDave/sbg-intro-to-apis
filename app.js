const express = require("express");
const path = require('path');

const app = express();

app.use(express.text()) // for parsing everything else
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/docs", (req, res, next) => {
  res.redirect('/docs/1.0.0');
})
app.get("/docs/:version", (req, res, next) => {
  res.sendFile(path.join(__dirname+'/html/docs'+req.params.version+'.html'));
})

const introRouter = express.Router();
introRouter.get("/hello", (req, res, next) => {
  var name = ((req.query.name != undefined) ? req.query.name : 'World');
  res.send("Hello, " + name + "!")
})

introRouter.post("/echo", (req, res, next) => {
  res.send(req.body);
})

introRouter.get("/random", (req, res, next) => {
  res.redirect('/intro/random/6');
})

introRouter.get("/random/:number", (req, res, next) => {
  if (parseInt(req.params.number) >= 4) {
    res.send("4"); // chosen by fair dice roll. https://xkcd.com/221/
  } else {
    res.status(400)
    res.send("number must be greater than 4")
  }

})

app.use('/intro', introRouter)



things = ["Apple", "Banana", "Carrot"]

const v2Router = express.Router();

v2Router.get("/things", (req, res, next) => {
  res.json(things);
});
v2Router.post("/things", (req, res, next) => {
  const body = req.body
  console.log(body);
  if (body.thing !== undefined) {
    things.push(body.thing)
    res.json(things);
  } else {
    res.status(400).send('Invalid Request')
  }
});

v2Router.delete("/things", (req, res, next) => {
  const body = req.body
  console.log(body);
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

app.use('/v2', v2Router)
