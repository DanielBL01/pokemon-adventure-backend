class Team {
    constructor() {
        this.team = [];
    }

    add(pokemon) {
        if (this.team.length < 3) {
            this.team.push(pokemon);
        }

        return this.team;
    }

    swap(wild, team) {
        var index = this.team.indexOf(team);
        if (index !== -1) {
            this.team[index] = wild;
        }

        return this.team;
    }

    remove(pokemon) {
        if (this.team.length > 1) {
            this.team.filter(team => team === pokemon)
        }

        return this.team;
    }
}

module.exports = {
    Team
}