const mongoose = require('mongoose');
const SchoolsCounterSchema = mongoose.Schema;

// this will be our data base's data structure
const schoolsCounterSchema = new SchoolsCounterSchema(
  {
    _id: mongoose.ObjectId,
    schoolsCounter: Number
  },
  { collection: 'schoolsCounter' }
);
// schoolsCounterSchema.methods.getNextCount = function (){

// }

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('SchoolsCounter', schoolsCounterSchema);
