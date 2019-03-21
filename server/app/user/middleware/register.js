const BCRYPT_SALT_ROUNDS = 12;
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../../../models/models').User;
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    'register',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        },
        (req, email,  password, done) => {
            try {
                User.findOne({
                    where: {
                        email: req.body.email
                    },
                }).then((user) => {
                    if (user != null) {
                        return done(null, false, {
                            message: 'username or email already taken',
                        });
                    }
                    bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
                        User.create({
                            email,
                            password: hashedPassword,
                        }).then((user) => {
                            console.log('user created');
                            return done(null, user);
                        });
                    });
                });
            } catch (err) {
                return done(err);
            }
        },
    ),
);