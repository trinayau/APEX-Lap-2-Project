const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, 'secret', (err, decodedToken) => {
           if (err){
               res.redirect('/users/login');
                err.message;
           } else {
               console.log(decodedToken);
           }
        })
    } else {
        res.redirect('/users/login');
    }
    next()
}

module.exports = {requireAuth};