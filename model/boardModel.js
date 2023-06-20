const mongoose = require("mongoose");

const schema = mongoose.Schema({
    uid: String,
    name: String
})

const boardModel = mongoose.model("board", schema);

module.exports = { boardModel };