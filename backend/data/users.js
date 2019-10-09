const mongoose = require('mongoose');
const UserSchema = mongoose.Schema;

// this will be our data base's data structure
const userSchema = new UserSchema(
  {
    _id: String,
    choosedSchools: Array
  },
  { collection: 'users' }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Users', userSchema);
