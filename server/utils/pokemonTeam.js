class Team {
    constructor() {
        this.team = [];
        this.experience = {};
    }

    catch(pokemon) {
        if (this.team.length < 6) {
            if (!this.team.includes(pokemon)) {
                this.team.push(pokemon);
                this.experience[pokemon] = 0;
            }
        }
    }

    release(pokemon) {
        if (this.team.length > 1) {
            this.team = this.team.filter(teammate => teammate !== pokemon);
            delete this.experience[pokemon];
        }
    }

    get() {
        return this.team;
    }

    getExperience() {
        return this.experience;
    }

    updateExperience(pokemon) {
        this.experience[pokemon] += 1;
    }
}

module.exports = {
    Team
}