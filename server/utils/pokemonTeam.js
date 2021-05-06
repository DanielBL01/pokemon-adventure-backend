class Team {
    constructor() {
        this.team = [];
    }

    catch(pokemon) {
        if (this.team.length < 6) {
            console.log(`${pokemon} has been caught and added to your Team`);
            this.team.push(pokemon);
        } else {
            console.log('You cannot have more than 6 Pokémon in your Team');
        }
    }

    release(pokemon) {
        if (this.team.length > 1) {
            console.log(`${pokemon} has been released and removed from your Team`);
            this.team.filter(team => team === pokemon);
        }
    }

    get() {
        return this.team;
    }
}

module.exports = {
    Team
}