const Model = require('../models/Model');
const User = require('../models/User');

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
    const { username, password } = req.body;
    try {
        const user = await User.create({ username, password });
        res.status(201).json(user);
    }
    catch(err) {
        console.log(err);
        res.status(422).send('error, user not created');
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
        const {email, password} = req.body;
        console.log(email, password);
        res.send('user login')
    } catch (err) {
        console.log(err)
        res.status(422).json({err})
    }
}



module.exports = { getSignup, addUser, getLogin, loginUser}