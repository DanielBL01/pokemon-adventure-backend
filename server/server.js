const app = require('express')();
const httpServer = require('http').createServer(app);
const port = process.env.PORT || 8000;
const axios = require("axios");
const { getPokemonDetails } = require('./utils/pokemonDetails');

app.get('/habitat', async (req, res) => {
    let response = [];
    var index = req.query.index;

    try {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon-habitat/${index}`);
        for (const pokemon of result.data.pokemon_species) {
            var data = {};
            data['name'] = pokemon.name;
            var details = await getPokemonDetails(pokemon.url);
            data['details'] = details;
            response.push(data); 
        }
        console.log('Successful Request');
    } catch (err) {
        if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log('Server Response Error');
        } else if (err.request) {
            // client never received a response, or request never left
            console.log('Server Request Error');
        } else {
            // anything else
            console.log('Server Unexpected Error');
        }
    }

    res.json(response);
});

httpServer.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});