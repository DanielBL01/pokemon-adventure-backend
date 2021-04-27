const axios = require("axios");

async function getPokemonID(url) {
    try {
        const result = await axios.get(url);
        return result.data.id;
    } catch (err) {
        if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log('ID Response Error');
        } else if (err.request) {
            // client never received a response, or request never left
            console.log('ID Request Error');
        } else {
            // anything else
            console.log('ID Unexpected Error');
        }
    }
}

module.exports = { getPokemonID }