const session = require('express-session');
const passport = require('../config/passport'); // Adjust the path to your passport configuration

module.exports = (app) => {
    app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());
};

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ success: false, message: 'Unauthorized' });
};

