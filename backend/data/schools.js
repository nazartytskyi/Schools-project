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
    language: String,
    news: [
      {
        _id: mongoose.ObjectId,
        img: String,
        title: String,
        description: String,
        date: String
      }
    ],
    firstGrade: {
      _id: false,
      total: Number,
      enrolled: Number,
      requests: [
        {
          dateApply: String,
          status: String,
          firstPriority: Boolean,
          studentName: String,
          dateBirth: String,
          fatherName: String,
          motherName: String,
          email: String,
          adress: {
            _id: false,
            city: String,
            district: String,
            street: String,
            building: String
          }
        }
      ]
    }
  },
  { collection: 'schools' }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Schools', schoolsSchema);
