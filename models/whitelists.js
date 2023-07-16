const mongoose = require("mongoose");

module.exports = mongoose.model(
    "whitelists",
    new mongoose.Schema({
        userId: String,
        address: String
    })
);