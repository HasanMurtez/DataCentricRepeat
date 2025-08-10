var express = require('express');
var mysqlDAO = require('./mySqlDao');

var app = express();

app.set('view engine', 'ejs');

app.listen(3004, () => {
    console.log("Running on port 3004");
});

app.get("/", (req, res) => {
    res.render("home"); 
});
