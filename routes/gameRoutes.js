const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController')
const habitController = require('../controllers/habitController')

router.route('/')
    .get(gameController.getAll)         //done
    .post(gameController.createGame)    //done

router.route('/:id')
    .get(habitController.getAllHabits)  //done           
    .post(habitController.createHabit) //done
    .put(habitController.updateHabit) 
    .delete(habitController.deleteHabit) //done

module.exports = router;
