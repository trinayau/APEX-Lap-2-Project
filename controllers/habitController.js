const Habit = require('../models/Habit');
const jwt = require('jsonwebtoken');

async function getAllHabits(req, res) {
    try {
        const decodedToken = jwt.decode(req.headers['cookie'].split('=')[1]);
        const habitsData = await Habit.getAllHabits(decodedToken.id, req.params.id);
        //habitsData: {habits: habits, title: game.gameName}
        res.render('habitPage', {habits: habitsData.habits, title: habitsData.title});
    } catch (err) {
        console.log(err)
        res.status(404).json({ err })
    }
}

async function createHabit(req, res) {
    try {
        const decodedToken = jwt.decode(req.headers['cookie'].split('=')[1]);
        const result = await Habit.create(decodedToken.id, req.params.id ,JSON.parse(req.body));
        res.status(201).send("All good");
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

async function updateHabit(req, res) {
    try {
        const decodedToken = jwt.decode(req.headers['cookie'].split('=')[1]);
        const result = await Habit.updateHabit(decodedToken.id, req.params.id, req.body);
        res.status(201).json(result);
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

async function deleteHabit(req, res) {
    try {
        const result = await Habit.delete(req.body, req.params.id);
        res.status(201).send('Deleted');
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

module.exports = {createHabit, deleteHabit, getAllHabits, updateHabit}

