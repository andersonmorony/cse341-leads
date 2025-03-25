const createError = require('http-errors');

const isLogged = (req, res, next) => {
    if(req.isAuthenticated()) {
        console.log('User is logged in');
        return next();
    }
    throw createError(401, 'User is not authenticated');
};

module.exports = isLogged;