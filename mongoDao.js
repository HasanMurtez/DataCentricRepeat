const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
let db, lecturers;

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        db = client.db('proj2024MongoDB');   
        lecturers = db.collection('lecturers');
    })
    .catch(err => console.log('mongo connect error: ' + err));

// list all lecturers sorted by lecturer id ascending
function getAllLecturers() {
    return lecturers.find({}).sort({ _id: 1 }).toArray();
}

module.exports = { getAllLecturers };
