const Schema = require('./Schema');
const mongoose = require('mongoose');
const Game = require('./Game');
const Habit = require('./Habit');

module.exports = class Habit {
    constructor() { }

    static async create(username, gameId, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const habit = await Schema.Habit.create(data);
                console.log(parseInt(gameId))
                console.log(username)
                const result = await Schema.User.updateOne({
                    username: username.toLowerCase(),
                    "games.gameId": parseInt(gameId)
                }, {
                    "$push": {
                        "games.$.habits": habit
                    }
                })
                resolve(habit);
            } catch (err) {
                console.log(err)
                reject('Habit could not be created');
            }
        });
    };

    static async getAllHabits(username, gameId) {
        return new Promise(async (resolve, reject) => {
            try {
                const game = await Game.findById(username, parseInt(gameId));
                const habits = game.habits;
                resolve(
                    {
                        habits: habits,
                        title: game.gameName,
                        gameId: game.gameId
                    });
            } catch (err) {
                reject(`Habits with gameID: ${id} not found`);
            }
        });
    }

    static async delete(habitId) {
        return new Promise(async (resolve, reject) => {
            try {
                const deleted = await Schema.Habit.deleteOne({ _id: habitId })
                // const deleted = await Schema.Habit.deleteOne({ _id: mongoose.Types.ObjectId(habitId) })
                resolve(deleted);
            } catch (err) {
                console.log(err)
                reject('Habit could not be deleted');
            }
        });
    };
}
