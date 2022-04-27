const Game = require('../models/Game');

async function getAll(req, res) {
    try {
        const games = await Game.all;
        res.status(200).json(games)
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function createGame(req, res) {
    try {
        const { gameId, gameName } = req.body;
        await Game.create({ gameId, gameName })
        res.status(201).json({ user: username });
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

async function showGameById(req, res) {
    try {
        const game = await Game.getById(req.params.id);
        res.status(200).json(game)
    } catch (err) {
        res.status(404).json({ err })
        console.log(err)
    }
}

async function updateGame(req, res) {
    try {
        const game = await Game.getById(req.params.id);
        const resp = await game.update();
        res.status(204).json(resp)
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

module.exports = { getAll, showGameById, createGame, updateGame}
