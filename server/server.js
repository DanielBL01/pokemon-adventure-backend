const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser')
const axios = require("axios");
const { PokemonDetails } = require('./utils/pokemonDetails');
const mongoose = require('./db/mongoose');
const { Pokedex } = require('./db/schema/pokedex');
const { Team } = require('./utils/pokemonTeam');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

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

app.get('/team', (req, res) => {
    let response = team.get();
    res.json(response);
});

app.post('/add', (req, res) => {
    const pokemon = req.body.pokemon;
    team.add(pokemon);

    res.send('Success')
});

app.post('/swap', (req, res) => {
    var wild = req.body.wild;
    var team = req.body.team;
    team.swap(wild, team);

    res.send('Success')
});

app.post('/remove', (req, res) => {
    var pokemon = req.body.pokemon;
    team.remove(pokemon);

    res.send('Success')
});

httpServer.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});