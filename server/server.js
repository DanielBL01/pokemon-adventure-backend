const app = require('express')();
const httpServer = require('http').createServer(app);
const port = process.env.PORT || 8000;
const axios = require("axios");
const { getPokemonDetails } = require('./utils/pokemonDetails');

app.get('/habitat', async (req, res) => {
    let response = []
    let list = [];
    let index = req.query.index;

    try {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon-habitat/${index}`);
        const data = result.data;

        for (const pokemon of data.pokemon_species) {
            list.push(pokemon.name);
        }
        
        let randomPokemon = list[Math.floor(Math.random() * list.length)];
        const details = await getPokemonDetails(randomPokemon);
        response.push(details);
        
        res.json(response);
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
});

httpServer.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});