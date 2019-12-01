// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    id: Number,
    username:{ type:String, required: true, unique: true},
    salt: {type: String, required: true, unique: true},
    hashed_psswd: {type: String, required: true, unique: true},
    favorites: []
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);
