const Schema = require('./Schema');
const Habit = require('./Habit');

module.exports = class Game {
    constructor() { }

    static get all() {
        const cursor = db.collection('games').find({});
        //const cursor = Schema.Game.find({});
        return cursor
    }

    static async create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const gameParams = {
                    gameId: data.gameId,
                    gameName: data.gameName
                }
                const game = await Schema.Game.create(gameParams);
                await Schema.User.findOneAndUpdate(
                    { username: data['username'].toLowerCase() },
                    { $push: { games: game } })
                resolve(game);
            } catch (err) {
                console.log(err);
                reject('Game could not be created');
            }
        });
    };

    static async findById(data, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Schema.User.findOne({ username: data['username'].toLowerCase() });
                const game = user.games.filter(gameObj => gameObj.gameId === parseInt(id));
                resolve(game);
            } catch (err) {
                console.log(err)
                reject(`game with id: ${id} not found`);
            }
        });
    }

    async updateById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const game = findById(id);
                const updated = db.collection('games').update({ gameId: id }, { $set: { "habits": id } });
                //resolve (result);
            } catch (err) {
                reject('object could not be updated');
            }
        });
    };

    static async getHabits(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const game = Schema.Game.findOne({ gameId: id });
                const habits = game.habits;
                resolve(habits);
            } catch (err) {
                reject(`game with id: ${id} not found`);
            }
        });
    }
}