const express = require('express');
const router = express.Router();
const objectController = require('../controllers/controller')


router.get('/', objectController.index)
router.get('/:id', objectController.show)
router.post('/', objectController.create)
router.delete('/:id', objectController.destroy)

//router.route('/')
    // .get(controller.show)
    // .post()
    // .delete()

module.exports = router;