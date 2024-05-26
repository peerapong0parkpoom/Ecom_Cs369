const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const dbconfig = require('../config/database');
const sql = require('mssql');

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const pool = await sql.connect(dbconfig);
        const result = await pool.request()
            .input('user_id', sql.Int, id)
            .query('SELECT * FROM Users WHERE user_id = @user_id');

        const user = result.recordset[0];
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username, password, done) => {
        try {
            const pool = await sql.connect(dbconfig);
            const result = await pool.request()
                .input('username', sql.NVarChar, username)
                .query('SELECT * FROM Users WHERE username = @username');

            if (result.recordset.length === 0) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            const user = result.recordset[0];

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            // If authentication succeeds, return user object
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

module.exports = passport;
