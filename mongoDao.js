const { MongoClient } = require('mongodb');

let lecturers;

MongoClient.connect('mongodb://127.0.0.1:27017')
  .then(client => {
    const db = client.db('proj2024MongoDB');
    lecturers = db.collection('lecturers');
    console.log('Connected to MongoDB');
  })
  .catch(err => console.log('mongo connect error: ' + err.message));

// list all lecturers sorted by lecturer id ascending
function getAllLecturers() {
  return lecturers.find({}).sort({ _id: 1 }).toArray();
}

// delete one lecturer by id
function deleteLecturer(lid) {
  return lecturers.deleteOne({ _id: lid }).then(r => r.deletedCount);
}

module.exports = { getAllLecturers, deleteLecturer };
