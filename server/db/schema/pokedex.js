const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokedexSchema = new Schema({
    id: Number,
    name: String,
    height: Number,
    weight: Number,
    hp: Number,
    attack: Number,
    defense: Number, 
    special_attack: Number,
    special_defense: Number,
    speed: Number,
    types: [String]
});

const pokedexModel = mongoose.model('pokedex', pokedexSchema);

module.exports = {
    pokedexModel
}