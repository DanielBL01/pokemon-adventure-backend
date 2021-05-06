class Team {
    constructor() {
        this.team = [];
    }

    catch(pokemon) {
        if (this.team.length < 6) {
            this.team.push(pokemon);
        } else {
            console.log('You cannot have more than 6 Pokémon in your Team');
        }
    }

    release(pokemon) {
        if (this.team.length > 1) {
            this.team = this.team.filter(teammate => teammate !== pokemon);
            console.log(this.team);
        }
    }

    get() {
        return this.team;
    }
}

module.exports = {
    Team
}