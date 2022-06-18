# Pokemon Adventure

Server code for https://github.com/DanielBL01/pokemon-adventure-frontend

## Table of Contents
- [About this project](#about-this-project)
    - [Purpose](#purpose)
    - [How to Play](#how-to-play)
    - [Built With](#built-with)
    - [Future Improvements](#future-improvements)

## About This Project
### Purpose
Like many, Pokémon is an incredibly nostalgic video game that I used to play all the time when I was a little kid and so I wanted to use my full stack development experience to build a mini game version of Pokémon that can run on a web browser.
### How to Play
- Pick a Starter Pokemon.
- Explore different habitats to spot wild Pokémon and battle them. Only when you have defeated the wild Pokémon can you catch it.
- Check your Pokédex to see which Pokémon you have seen so far.
- Check your Team to see statistics of your Pokémon and select any from your Team to use for battle!
### Built With
- HTML/CSS/JavaScript
- React
- Node/Express
- MongoDB
- PokeAPI
- Axios
- Heroku
### Future Improvements
1. Add a login authentication system. The current web app is solely for single user only. The MongoDB used for this project has a single schema model to store Pokémon data as a cache and the user's team is saved through a utility class called Team and is not in a database. This ultimately means if the current user were to refresh the page, their team would be lost since the state of the web app would be reset.
2. There is no ability for the user to swap Pokémon nor choose another Pokémon if their current Pokémon was defeated in battle like the real Pokémon video game. Having this feature would make this project more enjoyable and closer to the real game.