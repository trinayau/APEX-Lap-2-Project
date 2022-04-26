const Habit = require('../models/User');

async function index (req, res) {
    try {
        //const object = await Model.all;
        //res.status(200).json(object)
        res.send('APEX HABITS');
    } catch (err) {
        res.status(500).json({err})
    }
}

async function show (req, res) {
    try {
        const object = await Model.getById(req.params.id);
        res.status(200).json(object)
    } catch (err) {
        res.status(404).json({err})
        console.log(err)
    }
}

async function create (req, res) {
    try {
        const object = await Model.create(req.body);
        res.status(201).json(object)
    } catch (err) {
        console.log(err)
        res.status(422).json({err})
    }
}

async function destroy (req, res) {
    try {
        const object = await Model.getById(req.params.id);
        const resp = await object.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
        console.log(err)
    };
}

async function update (req, res) {
    try {
        const object = await Model.getById(req.params.id);
        const resp = await object.update();
        res.status(204).json(object)
    } catch (err) {
        console.log(err)
        res.status(422).json({err})
    }
}

module.exports = { index, show, create, destroy, update}
