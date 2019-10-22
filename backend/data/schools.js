const mongoose = require('mongoose');
const SchoolsSchema = mongoose.Schema;

// this will be our data base's data structure
const schoolsSchema = new SchoolsSchema(
  {
    _id: mongoose.ObjectId,
    id: Number,
    name: String,
    description: String,
    photo: String,
    phoneNumber: String,
    adress: Object,
    language: String,
    email: String,
    avgZno: Number,
    foreignLanguages: [String],
    director: {
      name: String,
      photo: String,
      age: String
    },
    teachers: [
      {
        _id: mongoose.ObjectId,
        name: String,
        subject: String,
        photo: String,
        age: String
      }
    ],
    students: [
      {
        _id: mongoose.ObjectId,
        name: String,
        subject: String,
        photo: String,
        age: String
      }
    ],
    feedbacks: [
      {
        _id: mongoose.ObjectId,
        rate: Number,
        author: String,
        text: String
      }
    ],
    adress: {
      _id: false,
      city: String,
      district: String,
      street: String,
      building: String
    },
    coordinates: {
      _id: false,
      lat: Number,
      lng: Number
    },
    news: [
      {
        _id: mongoose.ObjectId,
        img: String,
        title: String,
        description: String,
        date: String
      }
    ],
    vacancies: [
      {
        _id: mongoose.ObjectId,
        title: String,
        description: String,
        salary: String,
        employment: String,
        date: String
      }
    ],
    firstGrade: {
      _id: false,
      total: Number,
      free: Number,
      enrolled: Number,
      requests: [
        {
          _id: mongoose.ObjectId,
          dateApply: String,
          comment: String,
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
