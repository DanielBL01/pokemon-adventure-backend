class Team {
    constructor() {
        this.team = [];
    }

    add(pokemon) {
        if (this.team.length < 6) {
            this.team.push(pokemon);
            console.log(`Successfully added ${pokemon} to Team`);
            console.log(`Current Team: ${this.team}`);
        }
        return this.team;
    }

    swap(wild, team) {
        var index = this.team.indexOf(team);
        if (index !== -1) {
            this.team[index] = wild;
            console.log(`Successfully swaped ${team} for ${wild} in Team`);
            console.log(`Current Team: ${this.team}`);
        }
        return this.team;
    }

    remove(pokemon) {
        if (this.team.length > 1) {
            this.team.filter(team => team === pokemon);
            console.log(`Successfully removed ${pokemon} from Team`);
            console.log(`Current Team: ${this.team}`);
        }
        return this.team;
    }

    get() {
        return this.team;
    }
}

module.exports = {
    Team
}