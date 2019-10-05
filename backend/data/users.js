const mongoose = require('mongoose');
const UsersSchema = mongoose.Schema;

// this will be our data base's data structure
const usersSchema = new UsersSchema(
  {
    firebaseId: Number,
    choosedSchools: Array
  },
  { collection: 'users' }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Users', usersSchema);
