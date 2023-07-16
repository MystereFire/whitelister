function loadDb (client) {
    const mongoose = require("mongoose");

    if (!process.env.DATABASE) return;
    mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
        console.log('-> Connected to MongoDB.')
    });
}

module.exports = { loadDb };