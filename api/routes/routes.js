const express = require('express');
const router = express.Router();
const objectController = require('../controllers/controller')


// router.get('/', objectController.index)
// router.get('/:id', objectController.show)
// router.post('/', objectController.create)
// router.delete('/:id', objectController.destroy)

router.route('/')
    .get(objectController.index)
    .post(objectController.create)
    
router.route(':/id')
    .get(objectController.show)
    .delete(objectController.destroy)
    .put(objectController.update) //update not create


router.route('/users')
    .get(objectController.index)
    .post(objectController.addUser)

router.route('/users/login')
    .post(objectController.getUser)

module.exports = router;
