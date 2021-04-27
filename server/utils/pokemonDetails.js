const axios = require("axios");
const { getPokemonID } = require("./pokemonID");

async function getPokemonDetails(url) {
    var response = {};

    try {
        const id = await getPokemonID(url);
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        response['name'] = result.data.name;
        response['id'] = result.data.id;
        response['height'] = result.data.height;
        response['weight'] = result.data.weight;

        var types = [];
        result.data.types.forEach(type => {
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