const Model = require('../models/Model');
const User = require('../models/User');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {username: '', password: '', email: ''};

    //duplicate error codename
    if(err.code === 11000 && err.message.includes('username')){
        errors.username = 'That username is already in use'
        return errors;
    } else if(err.code === 11000 && err.message.includes('email')){
        errors.username = 'That email is already in use'
        return errors;
    }

    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

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
    const { username, password, email } = req.body;
    try {
        const user = await User.create({ username, password, email });
        res.status(201).json(user);
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(422).json(errors);
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
        const {email, password} = req.body;
        console.log(email, password);
        res.send('user login')
    } catch (err) {
        console.log(err)
        res.status(422).json({err})
    }
}



module.exports = { getSignup, addUser, getLogin, loginUser}