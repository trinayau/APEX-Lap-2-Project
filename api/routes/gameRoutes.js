const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController')
const habitController = require('../controllers/habitController')

router.route('/')
    .get(gameController.getAll)         //done
    .post(gameController.createGame)    //done

router.route('/:id')
    .get(gameController.showGameById)   //done           
    .post(habitController.createHabit)
    .delete(habitController.deleteHabit)    //in progress


module.exports = router;
