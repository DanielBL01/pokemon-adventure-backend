const axios = require("axios");

async function PokemonDetails(name) {
    var response = {};

    try {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemon_data = result.data;
        response['name'] = name
        response['height'] = pokemon_data.height;
        response['weight'] = pokemon_data.weight;

        let stats = {};
        pokemon_data.stats.forEach(stat => {
            stats[stat.stat.name] = stat.base_stat;
        });
        response['stats'] = stats;

        let types = [];
        pokemon_data.types.forEach(type => {
            types.push(type.type.name);
        });
        response['types'] = types;

        return response;

    } catch (err) {
        if (err.response) {
            console.log('Detail Response Error');
        } else if (err.request) {
            console.log('Detail Request Error');
        } else {
            console.log('Detail Unexpected Error');
        }
    }
}

module.exports = { 
    PokemonDetails 
}