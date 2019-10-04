const mongoose = require('mongoose');
const SchoolsSchema = mongoose.Schema;

// this will be our data base's data structure
const schoolsSchema = new SchoolsSchema(
  {
    id: Number,
    name: String,
    description: String,
    phoneNumber: String,
    adress: Object,
    language: String
  },
  { collection: 'schools' }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Schools', schoolsSchema);
