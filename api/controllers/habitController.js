const Habit = require('../models/Habit');

async function createHabit(req, res) {
    try {
        const { habitName, habitReps, habitMaxReps, habitComplete, habitStreak } = req.body;
        await Habit.create({ habitName, habitReps, habitMaxReps, habitComplete, habitStreak })
        res.status(201).json({ habit: habitName });
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

async function deleteHabit(req, res) {
    try {
        const habits = await Habit.delete(req.params.id2);
        res.status(201).json({ habit: habitName });
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

module.exports = {createHabit, deleteHabit}