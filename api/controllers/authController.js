const Model = require('../models/Model');

//signup get
async function getSignup (req, res) {
    try {
        res.render('signup')
    } catch (err) {
        console.log(err)
        res.status(422).json({err})
    }
}

//signup post
async function addUser (req, res) {
    try {
        // const object = await Model.addUser(req.body);
        // res.status(201).json(object)
        res.send('new user')
    } catch (err) {
        console.log(err)
        res.status(422).json({err})
    }
}


//login get
async function getLogin (req, res) {
    try {
        res.render('login')
    } catch (err) {
        console.log(err)
        res.status(422).json({err})
    }
}

//login post
async function loginUser (req, res) {
    try {
        // const object = await Model.addUser(req.body);
        // res.status(201).json(object)
        res.send('user login')
    } catch (err) {
        console.log(err)
        res.status(422).json({err})
    }
}



module.exports = { getSignup, addUser, getLogin, loginUser}