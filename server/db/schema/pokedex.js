const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoDB = 'mongodb://127.0.0.1:27017/pokemon-adventure';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var pokedexSchema = new Schema({
    name: String,
    height: Number,
    weight: Number,
    hp: Number,
    attack: Number,
    defense: Number, 
    speed: Number,
    types: [String]
});

var Pokedex = mongoose.model('Pokedex', pokedexSchema);

module.exports = {
    Pokedex
}