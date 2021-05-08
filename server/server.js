const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const port = process.env.PORT || 8000;
const cors = require('cors');
const axios = require("axios");
const { PokemonDetails } = require('./utils/pokemonDetails');
const { Pokedex } = require('./db/schema/pokedex');
const { Team } = require('./utils/pokemonTeam');

app.use(cors());
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
        const cache = await Pokedex.exists({name: randomPokemon});
        if (cache) {
            const result = await Pokedex.find({name: randomPokemon});
            res.json(result);
        } else {
            const details = await PokemonDetails(randomPokemon);
            response.push(details);
            const pokedex = new Pokedex({
                name: details.name,
                height: details.height,
                weight: details.weight,
                stats: {
                    hp: details.stats.hp,
                    attack: details.stats.attack,
                    defense: details.stats.defense, 
                    speed: details.stats.speed,
                },
                types: details.types
            });
            await pokedex.save();
            res.json(response)
        }
    } catch (err) {
        res.sendStatus(404);
    }
});

app.get('/team', async (req, res) => {
    let response = [];
    let team_list = team.get();
    for (const pokemon of team_list) {
        const result = await Pokedex.find({name: pokemon});
        response.push(result[0]);
    }
    res.json(response);
});

app.get('/experience', (req, res) => {
    let response = team.getExperience();
    res.json(response);
});

app.get('/pokedex', async (req, res) => {
    const pokedex = await Pokedex.find({});
    res.json(pokedex);
});

app.get('/delete', async (req, res) => {
    await Pokedex.deleteMany({});
    team.resetTeam();
    res.send('Successfully deleted cache and reset team');
});

app.post('/fighter', async (req, res) => {
    const fighter = req.body.fighter;
    const result = await Pokedex.find({name: fighter});
    res.json(result);
});

app.post('/partner', async (req, res) => {
    const starter = req.body.starter;
    const details = await PokemonDetails(starter);
    const pokedex = new Pokedex({
        name: details.name,
        height: details.height,
        weight: details.weight,
        stats: {
            hp: details.stats.hp,
            attack: details.stats.attack,
            defense: details.stats.defense, 
            speed: details.stats.speed,
        },
        types: details.types
    });
    await pokedex.save();
    team.catch(starter);
    res.send('Successfully selected a Starter')
});

app.post('/catch', (req, res) => {
    const pokemon = req.body.pokemon;
    team.catch(pokemon);
    res.send('Successfully caught Pokémon')
});

app.post('/release', (req, res) => {
    const pokemon = req.body.pokemon;
    team.release(pokemon);
    res.send('Successfully released Pokémon')
});

app.post('/updateExperience', (req, res) => {
    const pokemon = req.body.pokemon;
    team.updateExperience(pokemon);
    res.send('Successfully updated experience');
});

httpServer.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});