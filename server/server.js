const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const port = process.env.PORT || 8000;
const axios = require("axios");
const { PokemonDetails } = require('./utils/pokemonDetails');
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
        
        const query = await Pokedex.exists({name: details.name});
        if (query) {
            console.log(`${details.name} is already in Pokedex!`);
        } else {
            const pokedex = new Pokedex({
                name: details.name,
                height: details.height,
                weight: details.weight,
                hp: details.stats.hp,
                attack: details.stats.attack,
                defense: details.stats.defense, 
                speed: details.stats.speed,
                types: details.types
            });
            await pokedex.save();
            console.log(`${details.name} has been added to the Pokedex!`);
        }

        res.json(response);
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
});

app.get('/team', (req, res) => {
    let response = team.get();
    res.json(response);
});

app.get('/pokedex', async (req, res) => {
    const pokedex = await Pokedex.find({});
    res.json(pokedex);
});

// Call after Catching a Pokemon and you have less than six Pokemon
app.post('/catch', (req, res) => {
    const pokemon = req.body.pokemon;
    team.catch(pokemon);
    res.send('Successfully caught Pokémon')
});

app.post('/release', (req, res) => {
    var pokemon = req.body.pokemon;
    team.release(pokemon);
    res.send('Successfully released Pokémon')
});

httpServer.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});