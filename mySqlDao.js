var pmysql = require('promise-mysql');

var pool;

pmysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj2024mysql'
})
.then((p) => { pool = p; })
.catch((e) => { console.log("pool error: " + e); });

// list all students sorted by sid
function getAllStudents () {
    return pool.query('SELECT * FROM student ORDER BY sid ASC');
}

// one student by id
function getStudentById (sid) {
    return pool.query('SELECT * FROM student WHERE sid = ?', [sid])
        .then(rows => rows[0] || null);
}

// update student by id
function updateStudent (sid, name, age) {
    return pool.query('UPDATE student SET name = ?, age = ? WHERE sid = ?', [name, age, sid]);
}

// add student
function addStudent (sid, name, age) {
    return pool.query('INSERT INTO student (sid, name, age) VALUES (?, ?, ?)', [sid, name, age]);
}


// get grades report
function getGradesReport () {
  // used left join so students with no modules still show. 
    return pool.query(`
        SELECT s.name AS studentName, m.name AS moduleName, g.grade
        FROM student s
        LEFT JOIN grade g ON s.sid = g.sid 
        LEFT JOIN module m ON g.mid = m.mid
        ORDER BY s.name ASC, g.grade ASC
    `);
}

// count modules taught by a lecturer for delete check
function countModulesByLecturer(lid) {
    return pool.query('SELECT COUNT(*) AS cnt FROM module WHERE lecturer = ?', [lid])
        .then(rows => rows[0].cnt);
}

module.exports = {
    getAllStudents,
    getStudentById,
    updateStudent,
    addStudent,
    getGradesReport,
    countModulesByLecturer
};