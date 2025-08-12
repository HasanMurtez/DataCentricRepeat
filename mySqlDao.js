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

module.exports = { getAllStudents, getStudentById, updateStudent };
