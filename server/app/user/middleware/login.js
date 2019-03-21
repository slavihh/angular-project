const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../../../models/models');
const User = models.User;

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
        (email, password, done) => {
            try {
                User.findOne({
                    where: {
                        email: email
                    }
                }).then((user) => {
                    if (user === null) {
                        return done(null, false, 'Wrong Email');
                    }
                    bcrypt.compare(password, user.password).then((response) => {
                        if (response !== true) {
                            return done(null, false, {message: 'passwords do not match'});
                        }
                        return done(null, user);
                    });
                });
            } catch (err) {
                done(err);
            }
        },
    ),
);