var express = require('express');
var mysqlDAO = require('./mySqlDao');

var app = express();

app.set('view engine', 'ejs');

app.listen(3004, () => {
    console.log("Running on port 3004");
});

//home page
app.get("/", (req, res) => {
    res.render("home"); 
});

//students page
app.get("/students", (req, res) => {
    mysqlDAO.getAllStudents()
    .then((data) => {
        res.render("students", { students: data });
    })
    .catch((error) => {
        res.send(error);
    });
});
