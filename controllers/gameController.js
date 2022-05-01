const Game = require('../models/Game');
const jwt = require('jsonwebtoken');

async function getAll(req, res) {
    try {
        const decodedToken = jwt.decode(req.headers['cookie'].split('=')[1]);
        const games = await Game.getAllGames(decodedToken.id);
        res.status(200).json(games)
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function createGame(req, res) {
    try {
        const decodedToken = jwt.decode(req.headers['cookie'].split('=')[1]);
        await Game.create(decodedToken.id, JSON.parse(req.body))
        res.status(201).json({ game: req.body.gameName });
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

async function showGameById(req, res) {
    console.log(req.body)
    try {
        const game = await Game.findOne({gameId: req.params.id});
        res.status(200).json(game);
    } catch (err) {
        res.status(404).json({ err })
        console.log(err)
    }
}

/*

async function updateGame(req, res) {
    try {
        const decodedToken = jwt.decode(req.headers['cookie'].split('=')[1]);
        const game = await Game.findById(decodedToken.id, req.params.id);
        const resp = await Game.update();
        res.status(204).json(resp)
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

async function getHabits(req, res) {
    try {
        const habits = await Game.getHabits(req.params.id);
        res.status(200).json(habits)
    } catch (err) {
        res.status(404).json({ err })
        console.log(err)
    }
}
*/

module.exports = { getAll, showGameById, createGame }
