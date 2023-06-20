const mongoose = require("mongoose");

const schema = mongoose.Schema({
    email: String,
    password: String
})

const userModel = mongoose.model("user", schema);

module.exports = { userModel };