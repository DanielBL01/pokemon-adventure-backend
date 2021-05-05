const app = require('express')();
const httpServer = require('http').createServer(app);
const port = process.env.PORT || 8000;
const axios = require("axios");
const { PokemonDetails } = require('./utils/pokemonDetails');
const mongoose = require('./db/mongoose');
const { Pokedex } = require('./db/schema/pokedex');
const { Team } = require('./utils/pokemonTeam');

var team = new Team();

app.get('/habitat', async (req, res) => {
    let response = [];
    let list = [];
    var index = req.query.index;

    try {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon-habitat/${index}`);
        const data = result.data;

        for (const pokemon of data.pokemon_species) {
            list.push(pokemon.name);
        }
        
        let randomPokemon = list[Math.floor(Math.random() * list.length)];
        const details = await PokemonDetails(randomPokemon);
        response.push(details);
        
        res.json(response);
    } catch (err) {
        if (err.response) {
            console.log('Server Response Error');
        } else if (err.request) {
            console.log('Server Request Error');
        } else {
            console.log('Server Unexpected Error');
        }
    }
});

httpServer.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});