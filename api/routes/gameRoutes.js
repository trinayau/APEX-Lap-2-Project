const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController')


// router.get('/', objectController.index)
// router.get('/:id', objectController.show)
// router.post('/', objectController.create)
// router.delete('/:id', objectController.destroy)

router.route('/')
    .get(gameController.index)
    .post(gameController.create)

router.route('/:id')
    .get(gameController.show)
    .post(gameController.create)
    .put(gameController.update)

// router.route('/users')
//     .get(objectController.index)
//     .post(objectController.addUser)

// router.route('/users/login')
//     .post(objectController.getUser)

module.exports = router;
