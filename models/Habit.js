const Schema = require('./Schema');
const mongoose = require('mongoose');
const Game = require('./Game');
const Habit = require('./Habit');

module.exports = class Habit {
    constructor() { }

    static async create(username, gameId, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const habit = await new Schema.Habit(data);
                await Schema.User.updateOne({
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
                const user = await Schema.User.findOne({username: username});
                const game = user['games'].filter(game => game['gameId'] === parseInt(gameId));
                const habits = game[0]['habits'];
                resolve(
                    {
                        habits: habits,
                        title: game[0]['gameName'],
                        gameId: game[0]['gameId']
                    });
            } catch (err) {
                reject(`Habits with gameID: ${gameId} not found`);
            }
        });
    }

    static async updateHabit(username, gameId, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Schema.User.aggregate([{ $unwind: '$games' }
                    , { $unwind: '$games.habits' }
                    , { $match: { 'games.habits._id': mongoose.Types.ObjectId(data.habitId) } }
                ])

                console.log(result[0]['games']['habits'])

                if ((parseInt(data.habitChange) + result[0]['games']['habits']['habitReps']) <= result[0]['games']['habits']['habitMaxReps'] &&
                    (parseInt(data.habitChange) + result[0]['games']['habits']['habitReps']) >= 0) {
                    if ((parseInt(data.habitChange) + result[0]['games']['habits']['habitReps']) === result[0]['games']['habits']['habitMaxReps']) {
                        await Schema.User.findOneAndUpdate({ 'games.habits._id': mongoose.Types.ObjectId(data.habitId) },
                            { '$set': { 'games.$[o].habits.$[i].habitReps': (parseInt(data.habitChange) + result[0]['games']['habits']['habitReps']), 'games.$[o].habits.$[i].habitComplete': true } },
                            { arrayFilters: [{ 'o.gameId': parseInt(gameId) }, { 'i._id': mongoose.Types.ObjectId(data.habitId) }] })
                    } else {
                        await Schema.User.findOneAndUpdate({ 'games.habits._id': mongoose.Types.ObjectId(data.habitId) },
                            { '$set': { 'games.$[o].habits.$[i].habitReps': (parseInt(data.habitChange) + result[0]['games']['habits']['habitReps']), 'games.$[o].habits.$[i].habitComplete': false } },
                            { arrayFilters: [{ 'o.gameId': parseInt(gameId) }, { 'i._id': mongoose.Types.ObjectId(data.habitId) }] })
                    }
                    resolve(parseInt(data.habitChange) + result[0]['games']['habits']['habitReps'])
                }
                resolve()

            } catch (err) {
                console.log(err)
                reject(`Error updating habit: ${err.message}`);
            }
        });
    }

    static async updateHabitStreaks() {
        try {
            await Schema.User.updateMany({ "games.habits.habitComplete": true }, { $inc: { "games.habit.habitStreak": 1 }, "games.habit.habitComplete": false, "games.habit.habitReps": 0 });
            await Schema.User.updateMany({ "games.habits.habitComplete": false }, { "games.habit.habitComplete": false, "games.habit.habitReps": 0 });
        } catch (err) {
            console.log(err)
        }
    };

    static async delete(data, gameId) {
        return new Promise(async (resolve, reject) => {
            try {
                const deleted = await Schema.User.findOneAndUpdate({ 'games.habits._id': mongoose.Types.ObjectId(data.habitId) },
                    { '$pull': { 'games.$[o].habits': { '_id': mongoose.Types.ObjectId(data.habitId) } } },
                    { arrayFilters: [{ 'o.gameId': parseInt(gameId) }] })
                console.log(deleted);
                resolve(deleted);
            } catch (err) {
                console.log(err)
                reject('Habit could not be deleted');
            }
        });
    };
}
