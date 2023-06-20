const mongoose = require("mongoose");

const schema = mongoose.Schema({
    boardid: String,
    title: String,
    description: String,
    status: String
})

const taskModel = mongoose.model("task", schema);

module.exports = { taskModel };