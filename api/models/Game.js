const Schema = require('./Schema');
const User = require('./User');

module.exports = class Game {
    constructor() { }

    static async getAllGames(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findByUsername(username);
                const games = user['games'];
                console.log(user)
                resolve(games);
            } catch (err) {
                console.log(err);
                reject(`Games for ${username} could not be found`);
            }
        })
    }

    static async create(username, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const gameParams = {
                    gameId: data.gameId,
                    gameName: data.gameName
                }
                const game = await Schema.Game.create(gameParams);
                await Schema.User.findOneAndUpdate(
                    { username: username.toLowerCase() },
                    { $push: { games: game } })
                resolve(game);
            } catch (err) {
                console.log(err);
                reject('Game could not be created');
            }
        });
    };

    static async findById(username, gameId) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findByUsername(username);
                const game = user.games.filter(gameObj => gameObj.gameId === parseInt(gameId));
                resolve(game[0]);
            } catch (err) {
                console.log(err)
                reject(`game with id: ${gameId} not found`);
            }
        });
    }
}