const axios = require("axios");

async function getPokemonDetails(name) {
    var response = {};

    try {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemon_data = result.data;
        response['name'] = name
        response['id'] = pokemon_data.id;
        response['height'] = pokemon_data.height;
        response['weight'] = pokemon_data.weight;

        let stats = [];
        let entry = {};
        pokemon_data.stats.forEach(stat => {
            entry[stat.stat.name] = stat.base_stat;
        });
        stats.push(entry);
        response['stats'] = stats;

        let types = [];
        pokemon_data.types.forEach(type => {
            types.push(type.type.name);
        });
        response['types'] = types;

        return response;

    } catch (err) {
        if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log('Detail Response Error');
        } else if (err.request) {
            // client never received a response, or request never left
            console.log('Detail Request Error');
        } else {
            // anything else
            console.log('Detail Unexpected Error');
        }
    }
}

module.exports = { getPokemonDetails }