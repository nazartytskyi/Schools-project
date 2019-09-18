// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  {  collection: 'schools' }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Schools", DataSchema);