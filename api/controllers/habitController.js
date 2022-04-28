const Habit = require('../models/Habit');
const jwt = require('jsonwebtoken');
const { User } = require('../models/Schema');

async function getAllHabits(req, res) {
    try {
        const decodedToken = jwt.decode(req.headers['cookie'].split('=')[1]);
        const habitsData = await Habit.getAllHabits(decodedToken.id, req.params.id);
        //habitsData: {habits: habits, title: game.gameName}
        res.render('onlyHabit', {habits: habitsData.habits, title: habitsData.title});
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

async function deleteHabit(req, res) {
    try {
        const decodedToken = jwt.decode(req.headers['cookie'].split('=')[1]);
        decodedToken.id //user id
        //game id pass through
        //habit id
        const habitId = JSON.parse(req.body);
        console.log(habitId.id);
        const result = await Habit.delete(habitId.id);
        console.log('result');
        res.status(201).send('result');
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

module.exports = {createHabit, deleteHabit, getAllHabits}
