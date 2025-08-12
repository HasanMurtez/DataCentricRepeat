var express = require('express');
var mysqlDAO = require('./mySqlDao');
var app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.listen(3004, () => {
    console.log("Running on port 3004");
});

// Home
app.get("/", (req, res) => {
    res.render("home");
});


app.get("/students", (req, res) => {
    mysqlDAO.getAllStudents()
        .then((data) => res.render("students", { students: data }))
        .catch((error) => res.send(error));
});


// update page
app.get("/students/edit/:sid", (req, res) => {
    const sid = req.params.sid;
    mysqlDAO.getStudentById(sid)
        .then((student) => {
            if (!student) return res.status(404).send("Student not found");
            res.render("student_edit", { errors: [], student });
        })
        .catch((err) => res.send(err));
});

// post student
app.post("/students/edit/:sid", (req, res) => {
    const sid = req.params.sid;
    const { name, age } = req.body;

    const errors = [];
    if (!name || name.trim().length < 2) errors.push("Student Name should be at least 2 characters");
    const ageNum = Number(age);
    if (Number.isNaN(ageNum) || ageNum < 18) errors.push("Student Age should be at least 18");

    if (errors.length > 0) {
        return res.render("student_edit", {
            errors,
            student: { sid, name, age }
        });
    }

    mysqlDAO.updateStudent(sid, name.trim(), ageNum)
        .then(() => res.redirect("/students"))
        .catch((err) => res.send(err));
});


//add page
app.get("/students/add", (req, res) => {
    res.render("student_add", {
        errors: [],
        student: { sid: "", name: "", age: "" }
    });
});

//add student
app.post("/students/add", async (req, res) => {
    const { sid, name, age } = req.body;

    const errors = [];
    if (!sid || sid.trim().length !== 4) errors.push("Student ID should be 4 characters");
    if (!name || name.trim().length < 2) errors.push("Student Name should be at least 2 characters");
    const ageNum = Number(age);
    if (Number.isNaN(ageNum) || ageNum < 18) errors.push("Student Age should be at least 18");

    if (errors.length > 0) {
        return res.render("student_add", {
            errors,
            student: { sid, name, age }
        });
    }
    try {
        //duplicate check
        const existing = await mysqlDAO.getStudentById(sid.trim());
        if (existing) {
            return res.render("student_add", {
                errors: [`Student ID ${sid.trim()} already exists`],
                student: { sid, name, age }
            });
        }

        await mysqlDAO.addStudent(sid.trim(), name.trim(), ageNum);
        res.redirect("/students");
    } catch (err) {
        res.send(err);
    }
});
