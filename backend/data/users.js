const mongoose = require('mongoose');
const UserSchema = mongoose.Schema;

const userSchema = new UserSchema(
  {
    _id: String,
    choosedSchools: Array,
    role: String,
    bindedSchool: String
  },
  { collection: 'users' }
);

module.exports = mongoose.model('Users', userSchema);
