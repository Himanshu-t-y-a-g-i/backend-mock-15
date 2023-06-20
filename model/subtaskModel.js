const mongoose = require('mongoose');

const schema = mongoose.Schema({
    taskid: String,
    title: String,
    isCompleted: Boolean
})

const subtaskModel = mongoose.model("subtask", schema);

module.exports = { subtaskModel };