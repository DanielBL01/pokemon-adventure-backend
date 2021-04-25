const app = require('express')();
const httpServer = require('http').createServer(app);
const port = process.env.PORT || 8000;
const axios = require("axios");

app.get('/habitat', async (req, res) => {
    let response = [];
    var index = req.query.index;

    try {
        const habitat = await axios.get('https://pokeapi.co/api/v2/pokemon-habitat/' + index);
        habitat.data.pokemon_species.forEach((pokemon, index) => {
            var data = {};
            data['name'] = pokemon.name;
            response.push(data);
        });
        console.log('Successful Request');
    } catch (err) {
        if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log('Response Error');
        } else if (err.request) {
            // client never received a response, or request never left
            console.log('Request Error');
        } else {
            // anything else
            console.log('Unexpected Error');
        }
    }

    res.json(response);
});

httpServer.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});