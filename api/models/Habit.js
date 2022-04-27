const Schema = require('./Schema');

module.exports = class Habit {
    constructor() {}

    static async create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const habit = await Schema.Habit.create(data);
                resolve(habit);
            } catch (err) {
                console.log(err)
                reject('Habit could not be created');
            }
        });
    };

    static async findById(game, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const habit = game.Schema.Game.findOne({ habitId: id });
                resolve(habit);
            } catch (err) {
                reject(`Habit with id: ${id} not found`);
            }
        });
    }

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

    async delete(objectData) {
        return new Promise(async (resolve, reject) => {
            try {
                const deleted = await db.collection('habits').deleteOne({ status: this.id });
                //const deleted = Schema.Habit.deleteOne({ status: this.id });
                resolve (deleted);
            } catch (err) {
                reject('object could not be updated');
            }
        });
    };
}