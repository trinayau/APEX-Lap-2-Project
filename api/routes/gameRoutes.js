const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController')

router.route('/')
    .get(gameController.getAll)         //done
    .post(gameController.createGame)    //done

router.route('/:id')
    .get(gameController.showGameById)   //done           
    .put(gameController.updateGame)     //in progress

router.route('/:id/:id2')
    .get(gameController.getHabits)      //in progress
    .post(gameController.createHabit)   //in progress
    .delete(gameController.deleteHabit) //in progress

module.exports = router;
