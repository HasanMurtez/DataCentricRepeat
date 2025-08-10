var pmysql = require('promise-mysql');

var pool;

pmysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj2024mysql' 
})
.then((p) => {
    pool = p;
})
.catch((e) => {
    console.log("pool error: " + e);
});

var getStudents = function () {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM student')
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

//get students sorted by sid
var getAllStudents = function () {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM student ORDER BY sid ASC')
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

module.exports = { getStudents, getAllStudents };
