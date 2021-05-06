class Team {
    constructor() {
        this.team = [];
    }

    catch(pokemon) {
        if (this.team.length < 6) {
            this.team.push(pokemon);
        }
    }

    release(pokemon) {
        if (this.team.length > 1) {
            this.team = this.team.filter(teammate => teammate !== pokemon);
        }
    }

    get() {
        return this.team;
    }
}

module.exports = {
    Team
}