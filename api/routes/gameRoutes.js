const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController')

router.route('/')
    .get(gameController.getAll)         //done
    .post(gameController.createGame)    //done

router.route('/:id')
    .get(gameController.showGameById)   //done           
    .put(gameController.updateGame)     //in progress


module.exports = router;
