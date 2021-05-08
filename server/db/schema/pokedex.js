const mongoose = require('mongoose');
const { Schema } = mongoose;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

var pokedexSchema = new Schema({
    name: String,
    height: Number,
    weight: Number,
    stats: {
        hp: Number,
        attack: Number,
        defense: Number,
        speed: Number,
    },
    types: [String]
});

var Pokedex = mongoose.model('Pokedex', pokedexSchema);

module.exports = {
    Pokedex
}