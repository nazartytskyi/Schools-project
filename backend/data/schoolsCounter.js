const mongoose = require('mongoose');
const SchoolsCounterSchema = mongoose.Schema;

const schoolsCounterSchema = new SchoolsCounterSchema(
  {
    _id: mongoose.ObjectId,
    schoolsCounter: Number
  },
  { collection: 'schoolsCounter' }
);

module.exports = mongoose.model('SchoolsCounter', schoolsCounterSchema);
