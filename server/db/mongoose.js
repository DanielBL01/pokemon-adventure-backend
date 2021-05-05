const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/pokedex';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('errer', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
    mongoose
}