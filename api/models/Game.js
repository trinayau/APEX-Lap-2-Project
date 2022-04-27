const Schema = require('./Schema');
const Habit = require('./Habit');

module.exports = class Game {
    constructor() {}

    static async create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const game = await Schema.Game.create(data);
                resolve(user);
            } catch (err) {
                console.log(err)
                reject('Game could not be created');
            }
        });
    };

    static async update(objectData) {
        return new Promise(async (resolve, reject) => {
            try {
                //const {id, title, etc} = objectData
                //let result = await // insert into database [id, title, etc]
                //resolve (result);
            } catch (err) {
                reject('object could not be updated');
            }
        });
    };
}