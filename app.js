const express = require("express");
const path = require('path');

const app = express();

app.use(express.text()) // for parsing text/plain
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});

app.get("/docs", (req, res, next) => {
  res.redirect('/docs/1.0.0');
})
app.get("/docs/:version", (req, res, next) => {
  res.sendFile(path.join(__dirname+'/html/docs'+req.params.version+'.html'));
})

var introRoutes = require('./routes/introRoutes');
app.use('/intro', introRoutes)
var apiRoutes = require('./routes/apiRoutes');
app.use('/v2', apiRoutes)
var authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes)

app.get("/:page", (req, res, next) => {
  res.sendFile(path.join(__dirname+'/html/'+req.params.page+'.html'));
})
