const jwt = require('jsonwebtoken');
const User = require('../models/User')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'secret', (err, decodedToken) => {
      if (err) {
        res.redirect('login');
        err.message;
      }
    })
  } else {
    res.redirect('/login');
  }
  next()
}

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'secret', async (err, decodedToken) => {
      if (err) {
        console.log(err)
        res.locals.user = null;
        next();
      } else {
        res.locals.user = await User.findByUsername(decodedToken.id);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser, jwt};
