const mongoose = require('mongoose');
const SchemaSchools = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new SchemaSchools(
  {
    id: Number,
    name: String,
    description : String,
    phoneNumber : String,
    adress : String,
    language : String,
    firstGrade: Object
  },
  { collection: 'schools' }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Schools', DataSchema);
