const app = require('express')();
const httpServer = require('http').createServer(app);
const port = process.env.PORT || 8000;
const axios = require('axios');

app.get('/', async (req, res) => {
    try {
        const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        res.send(result.data); // Send JSON data response
    }
    catch (err) {
        console.error(err);
    }
});

app.get('/pokemon', async (req, res) => {
    var pokemon_name = req.query.name;
    try {
        const result = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon_name);
        res.send(result.data);
    } catch (err) {
        console.error(err);
    }
});

httpServer.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});