const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Blog", blogSchema);
