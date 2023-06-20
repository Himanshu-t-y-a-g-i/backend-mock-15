const mongoose = require("mongoose");

const schema = mongoose.Schema({
    quiz: Array,
    leaderboard: Array
})

const quizModel = mongoose.model("quiz", schema);

module.exports = { quizModel };